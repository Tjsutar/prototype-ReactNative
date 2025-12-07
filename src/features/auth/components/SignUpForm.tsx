import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { APP_TITLE, APP_SUBTITLE } from "../../../core/constants";
import paperTheme from "../../../core/theme/paperTheme";
import { signUpSchema } from "../../../core/validation/auth";

interface SignUpFormProps {
    onSignUpPress: (username: string, email: string, password: string) => Promise<void>;
    onLoginPress: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
    onSignUpPress,
    onLoginPress,
    isLoading = false,
    error,
}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSignUp = async () => {
        setValidationError(null);

        // Zod Validation
        const result = signUpSchema.safeParse({ username, email, password });

        if (!result.success) {
            setValidationError(result.error.errors[0].message);
            return;
        }

        await onSignUpPress(username, email, password);
    };

    return (
        <View className="flex-1 justify-center p-4">
            <View className="mb-8 items-center">
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: paperTheme.colors.primary }}>
                    Create Account
                </Text>
                <Text variant="bodyLarge" style={{ color: paperTheme.colors.placeholder, marginTop: 4 }}>
                    Join the community
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
                    placeholder="Choose a username"
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
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    left={<TextInput.Icon icon="email" color={paperTheme.colors.placeholder} />}
                    outlineColor={paperTheme.colors.disabled}
                    activeOutlineColor={paperTheme.colors.primary}
                    editable={!isLoading}
                    style={{ backgroundColor: 'white', marginTop: 16 }}
                />

                <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry
                    placeholder="Create a password"
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
                onPress={handleSignUp}
                loading={isLoading}
                disabled={isLoading}
                style={{ marginTop: 24, paddingVertical: 6, borderRadius: 8 }}
                contentStyle={{ height: 48 }}
            >
                {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <View className="flex-row justify-center mt-6">
                <Text variant="bodyMedium" style={{ color: paperTheme.colors.placeholder }}>
                    Already have an account?
                </Text>
                <Text
                    variant="bodyMedium"
                    style={{ color: paperTheme.colors.primary, fontWeight: 'bold', marginLeft: 4 }}
                    onPress={onLoginPress}
                >
                    Log In
                </Text>
            </View>
        </View>
    );
};
