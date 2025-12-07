import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { SignUpForm } from '../components/SignUpForm';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/core/navigation/RootNavigator';

export const SignUpScreen: React.FC = () => {
  const { signUp, isLoading, error } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignUpPress = async (username: string, email: string, password: string) => {
    const result = await signUp({ username, email, password });

    if (result.success) {
      Alert.alert(
        "Account Created",
        "Please log in with your new account.",
        [
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ]
      );
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SignUpForm
          onSignUpPress={handleSignUpPress}
          onLoginPress={handleLoginPress}
          isLoading={isLoading}
          error={error}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
