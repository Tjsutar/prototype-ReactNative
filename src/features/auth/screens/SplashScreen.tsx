import React from 'react';
import { View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { APP_TITLE, APP_SUBTITLE } from '@/core/constants';
import paperTheme from '@/core/theme/paperTheme';

export const SplashScreen: React.FC = () => {
    return (
        <View className="flex-1 bg-white items-center justify-center">
            <View className="items-center mb-10">
                <Text
                    variant="displayLarge"
                    style={{
                        color: paperTheme.colors.primary,
                        fontWeight: '900',
                        letterSpacing: 1,
                    }}
                >
                    {APP_TITLE}
                </Text>
                <Text
                    variant="titleMedium"
                    style={{
                        color: paperTheme.colors.text,
                        opacity: 0.7,
                        marginTop: 8,
                    }}
                >
                    {APP_SUBTITLE}
                </Text>
            </View>

            <ActivityIndicator size="large" animating={true} color={paperTheme.colors.primary} />

            <Text
                variant="labelSmall"
                style={{
                    position: 'absolute',
                    bottom: 40,
                    color: paperTheme.colors.disabled
                }}
            >
                Version 1.0.0
            </Text>
        </View>
    );
};
