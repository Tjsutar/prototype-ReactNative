import React from 'react';
import { SafeAreaView, StatusBar, ScrollView, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { DEFAULT_STATS } from '@/core/constants';
import paperTheme from '@/core/theme/paperTheme';
import { StatsGrid } from '@/components/StatsGrid';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const HomeScreen: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View className="bg-white px-6 py-6 rounded-b-3xl shadow-sm z-10">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text variant="titleMedium" style={{ color: paperTheme.colors.placeholder }}>
                            Welcome back,
                        </Text>
                        <Text variant="headlineMedium" style={{ color: paperTheme.colors.primary, fontWeight: "bold" }}>
                            {user?.username || 'User'}
                        </Text>
                        <Text variant="bodySmall" style={{ color: paperTheme.colors.disabled }}>
                            {user?.email}
                        </Text>
                    </View>
                    <IconButton
                        icon="logout"
                        mode="contained-tonal"
                        iconColor={paperTheme.colors.error}
                        containerColor="#fee2e2"
                        size={24}
                        onPress={() => logout()}
                    />
                </View>
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }}
                showsVerticalScrollIndicator={false}
                accessible
                accessibilityRole="list"
                accessibilityLabel="Main app content"
            >
                <View className="px-6 mb-4">
                    <Text variant="titleLarge" style={{ fontWeight: 'bold', color: paperTheme.colors.text }}>
                        Overview
                    </Text>
                </View>

                <StatsGrid stats={DEFAULT_STATS} />
            </ScrollView>
        </SafeAreaView>
    );
};
