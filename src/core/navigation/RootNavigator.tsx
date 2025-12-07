import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { SplashScreen } from '@/features/auth/screens/SplashScreen';
import { SignUpScreen } from '@/features/auth/screens/SignUpScreen';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    const { user, isSessionLoading } = useAuth();

    if (isSessionLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};
