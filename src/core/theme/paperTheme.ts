import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3b82f6",
    onPrimary: "#ffffff",
    secondary: "#6366f1",
    onSecondary: "#ffffff",
    background: "#f9fafb",
    onBackground: "#1f2937",
    surface: "#ffffff",
    onSurface: "#1f2937",
    onSurfaceVariant: "#6b7280", // Critical for placeholder text color
    error: "#ef4444",
    // Custom keys (need to augment type if strictly typed, but for now runtime works)
    accent: "#6366f1",
    text: "#1f2937",
    disabled: "#9ca3af",
    placeholder: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    info: "#06b6d4",
  },
  roundness: 8,
};

export type PaperTheme = typeof paperTheme;

export default paperTheme;
