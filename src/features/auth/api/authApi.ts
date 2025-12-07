import { api } from '../../../core/services/api';
import { AuthResponse, User } from '../models';
import { LoginInput, SignUpInput } from '../../../core/validation/auth';
import { setCredentials } from '../../../core/store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../../core/constants';

// Define the auth API by injecting endpoints into the empty 'api' service
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginInput>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            // On success, we save tokens and update state
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    // Persistence
                    await AsyncStorage.multiSet([
                        [STORAGE_KEYS.ACCESS_TOKEN, data.token],
                        [STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken],
                        [STORAGE_KEYS.USER_DATA, JSON.stringify(data.user)],
                    ]);

                    // Update Redux state
                    dispatch(setCredentials(data));
                } catch (err) {
                    // Error is handled by component
                }
            },
        }),
        signUp: builder.mutation<AuthResponse, SignUpInput>({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // No auto-login: Do not save to storage or dispatch credentials
                    // The UI will handle redirection to Login
                } catch (err) {
                    // Error is handled by component
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSignUpMutation } = authApi;
