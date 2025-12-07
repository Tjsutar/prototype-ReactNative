/**
 * Application Constants
 * Centralized configuration for app-wide use
 */

// ============================================================================
// App Info
// ============================================================================
export const APP_NAME = "SocialHook";
export const APP_TITLE = `${APP_NAME} 🎯`;
export const APP_SUBTITLE = "React Native Paper + NativeWind";

// ============================================================================
// API Configuration (extend from apiClient if needed)
// ============================================================================
import { Platform } from 'react-native';

// ============================================================================
// API Configuration (extend from apiClient if needed)
// ============================================================================
// Using 'adb reverse tcp:3000 tcp:3000' allows Android to use localhost directly.
const DEFAULT_URL = 'http://localhost:3000';
export const API_BASE_URL = process.env.REACT_APP_API_URL || DEFAULT_URL;
export const API_TIMEOUT = 30000;

// ============================================================================
// Storage Keys
// ============================================================================
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  THEME_PREFERENCE: "theme_preference",
  LANGUAGE: "language",
} as const;

// ============================================================================
// Stats Mock Data
// ============================================================================
export interface StatItem {
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

export const DEFAULT_STATS: StatItem[] = [
  { label: "Friends", value: 128, bgColor: "#3b82f6", textColor: "#ffffff" },
  { label: "Posts", value: 42, bgColor: "#10b981", textColor: "#ffffff" },
  { label: "Online", value: 56, bgColor: "#a855f7", textColor: "#ffffff" },
];

// ============================================================================
// Screen Names (for Navigation)
// ============================================================================
export const SCREENS = {
  AUTH: {
    LOGIN: "Login",
    SIGN_UP: "SignUp",
    FORGOT_PASSWORD: "ForgotPassword",
  },
  MAIN: {
    HOME: "Home",
    PROFILE: "Profile",
    WALLET: "Wallet",
    GROUPS: "Groups",
  },
  SETTINGS: "Settings",
} as const;

// ============================================================================
// Validation Rules
// ============================================================================
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

export default {
  APP_NAME,
  APP_TITLE,
  APP_SUBTITLE,
  API_BASE_URL,
  API_TIMEOUT,
  STORAGE_KEYS,
  DEFAULT_STATS,
  SCREENS,
  VALIDATION,
};
