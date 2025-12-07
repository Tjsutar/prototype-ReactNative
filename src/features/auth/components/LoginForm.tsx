import React, { useState } from "react";
import { View } from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { APP_TITLE, APP_SUBTITLE, VALIDATION } from "../../../core/constants";
import paperTheme from "../../../core/theme/paperTheme";
import { loginSchema } from "../../../core/validation/auth";

interface LoginFormProps {
    onLoginPress: (username: string, password: string) => Promise<void>;
    onSignUpPress: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    onLoginPress,
    onSignUpPress,
    isLoading = false,
    error,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleLogin = async () => {
        setValidationError(null);

        // Zod Validation
        const result = loginSchema.safeParse({ username, password });

        if (!result.success) {
            setValidationError(result.error.errors[0].message);
            return;
        }

        await onLoginPress(username, password);
    };

    return (
        <View className="flex-1 justify-center p-4">
            <View className="mb-8 items-center">
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: paperTheme.colors.primary }}>
                    Welcome Back
                </Text>
                <Text variant="bodyLarge" style={{ color: paperTheme.colors.placeholder, marginTop: 4 }}>
                    Sign in to continue
                </Text>
            </View>

            {(error || validationError) && (
                <View
                    style={{
                        backgroundColor: "#fee2e2",
                        borderLeftWidth: 4,
                        borderLeftColor: paperTheme.colors.error,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        marginBottom: 24,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "#dc2626", fontWeight: "600" }}>
                        {error || validationError}
                    </Text>
                </View>
            )}

            <View className="space-y-4">
                <TextInput
                    mode="outlined"
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    left={<TextInput.Icon icon="account" color={paperTheme.colors.placeholder} />}
                    outlineColor={paperTheme.colors.disabled}
                    activeOutlineColor={paperTheme.colors.primary}
                    editable={!isLoading}
                    style={{ backgroundColor: 'white' }}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    left={<TextInput.Icon icon="lock" color={paperTheme.colors.placeholder} />}
                    outlineColor={paperTheme.colors.disabled}
                    activeOutlineColor={paperTheme.colors.primary}
                    editable={!isLoading}
                    style={{ backgroundColor: 'white', marginTop: 16 }}
                />
            </View>

            <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={{ marginTop: 24, paddingVertical: 6, borderRadius: 8 }}
                contentStyle={{ height: 48 }}
            >
                {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <View className="flex-row justify-center mt-6">
                <Text variant="bodyMedium" style={{ color: paperTheme.colors.placeholder }}>
                    Don't have an account?
                </Text>
                <Text
                    variant="bodyMedium"
                    style={{ color: paperTheme.colors.primary, fontWeight: 'bold', marginLeft: 4 }}
                    onPress={onSignUpPress}
                >
                    Sign Up
                </Text>
            </View>
        </View>
    );
};
