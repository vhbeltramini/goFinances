import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { GoFinancesRoutesList } from "../utils/routes";
import { createStackNavigator } from '@react-navigation/stack';
import { Resume } from "../screens/Resume";
    
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};
    
const RootStack = createStackNavigator<RootStackParamList>();

const { Navigator, Screen } = createBottomTabNavigator<GoFinancesRoutesList>();


export function AppRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 60,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen 
                name="Transactions"
                component={Dashboard}
                options={{ 
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen 
                name="Add"
                component={Register}
                options={{ 
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="attach-money"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Screen 
                name="Resume"
                component={Resume}
                options={{ 
                    tabBarIcon: (({size, color}) => 
                        <MaterialIcons 
                            name="pie-chart"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
}

