import React from "react";
import { View, ViewStyle } from "react-native";
import { Card, Text } from "react-native-paper";
import { StatItem } from "../core/constants";

interface StatCardProps {
    stat: StatItem;
    style?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({ stat, style }) => (
    <View
        style={[
            {
                flex: 1,
                backgroundColor: stat.bgColor,
                paddingHorizontal: 12,
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
            },
            style,
        ]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={`${stat.label}: ${stat.value}`}
    >
        <Text variant="labelMedium" style={{ color: stat.textColor, fontWeight: "bold" }}>
            {stat.label}
        </Text>
        <Text
            variant="headlineMedium"
            style={{ color: stat.textColor, fontWeight: "bold", marginTop: 8 }}
        >
            {stat.value}
        </Text>
    </View>
);

interface StatsGridProps {
    stats: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
    <Card className="m-4">
        <Card.Content>
            <Card.Title title="Quick Stats" />
            <View
                className="flex-row justify-between mt-4 gap-2"
                accessible
                accessibilityRole="list"
                accessibilityLabel="Statistics grid"
            >
                {stats.map((stat, index) => (
                    <StatCard
                        key={stat.label}
                        stat={stat}
                        style={{
                            marginHorizontal: index === 1 ? 4 : 0,
                        }}
                    />
                ))}
            </View>
        </Card.Content>
    </Card>
);
