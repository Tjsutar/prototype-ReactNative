import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { DEFAULT_STATS } from '@/core/constants';
import { StatsGrid } from '@/components/StatsGrid';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/core/navigation/RootNavigator';

export const LoginScreen: React.FC = () => {
    const { login, isLoading, error } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLoginPress = async (username: string, password: string) => {
        const result = await login({ username, password });
        if (!result.success) {
            // Error is handled by the hook/state passing to the form, but we can alert too
            // Alert.alert("Login Failed", result.error || "Please try again");
        }
    };

    const handleSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                accessible
                accessibilityRole="list"
                accessibilityLabel="Login screen content"
            >
                <LoginForm
                    onLoginPress={handleLoginPress}
                    onSignUpPress={handleSignUpPress}
                    isLoading={isLoading}
                    error={error}
                />
                {!isLoading && <StatsGrid stats={DEFAULT_STATS} />}
            </ScrollView>
        </SafeAreaView>
    );
};
