import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TestingScreen from '../../screens/Testing';
import WelcomeScreen from '../../screens/welcome';

const Tab = createBottomTabNavigator();

export default function AppBar({ children }) {
	return (
		<Tab.Navigator initialRouteName='WelcomeScreen'>
			{children}
			<Tab.Screen
				name='WelcomeScreen'
				component={WelcomeScreen}
				options={{
					tabBarLabel: 'Welcome',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='home' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='TestingScreen'
				component={TestingScreen}
				options={{
					tabBarLabel: 'Testing',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='bell' color={color} size={size} />,
					tabBarBadge: 3,
				}}
			/>
		</Tab.Navigator>
	);
}
