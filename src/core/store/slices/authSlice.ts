import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/features/auth/models';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Global auth loading (e.g. for restoration)
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start true to check storage
};

// Async Thunk for checking storage on app load
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async () => {
    // Add a minimum delay to show the Splash Screen
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));

    const [token, refreshToken, userStr] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
      AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
      AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      minLoadTime,
    ]);

    if (token && userStr) {
      return {
        token,
        refreshToken,
        user: JSON.parse(userStr) as User,
      };
    }
    return null;
  }
);

// Async Thunk for simple logout (clearing storage)
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_DATA,
    ]);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // We can allow manual setting if needed
    setCredentials: (
      state,
      { payload }: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(restoreSession.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

