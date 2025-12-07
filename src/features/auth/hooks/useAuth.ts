import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../core/store';
import { useLoginMutation, useSignUpMutation } from '../api/authApi';
import { logoutUser } from '../../../core/store/slices/authSlice';
import { LoginInput, SignUpInput } from '../../../core/validation/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select state from Redux
  const { user, isAuthenticated, isLoading: isAuthLoading } = useSelector((state: RootState) => state.auth);

  // RTK Query Hooks
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [signUpMutation, { isLoading: isSignUpLoading, error: signUpError }] = useSignUpMutation();

  const login = useCallback(async (credentials: LoginInput) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      return { success: true, user: result.user };
    } catch (err: any) {
      return { success: false, error: err.data?.message || 'Login failed' };
    }
  }, [loginMutation]);

  const signUp = useCallback(async (credentials: SignUpInput) => {
    try {
      const result = await signUpMutation(credentials).unwrap();
      return { success: true, user: result.user };
    } catch (err: any) {
      return { success: false, error: err.data?.message || 'Sign up failed' };
    }
  }, [signUpMutation]);

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    return { success: true };
  }, [dispatch]);

  // Combined loading state for UI helpers (buttons, etc)
  const isLoading = isAuthLoading || isLoginLoading || isSignUpLoading;

  // Combined error (string or null)
  const error = (loginError as any)?.data?.message || (signUpError as any)?.data?.message || null;

  return {
    user,
    isAuthenticated,
    isSessionLoading: isAuthLoading, // Explicitly for Splash Screen
    isLoading, // Generic for buttons
    error,
    login,
    signUp,
    logout,
  };
};

export default useAuth;
