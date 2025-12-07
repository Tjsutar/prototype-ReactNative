import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { API_BASE_URL, STORAGE_KEYS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the response of the refreshToken endpoint
interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

// Custom base query with re-auth logic could be added here if needed.
// For now, we will use a standard fetchBaseQuery with header preparation.
// IMPORTANT: For production, you'd want to use `mutex` to prevent multiple refresh calls.

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        // By default, if we have a token in the store, let's use it for every request
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['User', 'Post'],
    endpoints: (builder) => ({
        // Auth endpoints will be injected from authApi or defined here
        // For separation of concerns, we can define a base here and inject elsewhere,
        // or just put everything small here. Given the scope, we'll put auth here for now 
        // or use code splitting if the user prefers. Let's keep it clean and just export the base.
    }),
});
