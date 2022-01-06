import React from 'react';
import SignUpScreen from './SignUp';
import WalkthroughScreen from './Walkthrough';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from '../Login';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function WalkthroughIndex() {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />
			<Stack.Navigator>
				<Stack.Screen
					name='SignUp'
					component={SignUpScreen}
					options={{
						headerTitle: 'Flourish',
					}}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='Walkthrough'
					component={WalkthroughScreen}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</View>
	);
}
