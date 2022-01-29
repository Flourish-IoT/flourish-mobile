import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome';
import TestingScreen from '../screens/Testing';
import { NavigatorTheme, GlobalNavigatorOptions } from '../providers/Theme';
import GardenScreen from '../screens/garden';
import SettingsScreenStack from '../screens/settings';
import CalendarScreen from '../screens/calendar';
import ForgotPasswordScreen from '../screens/welcome/ForgotPassword';
import { useIsLoggedIn } from '../data/auth';
import LoginScreen from '../screens/welcome/Login';
import SignUpStack from '../screens/welcome/SignUp';
import SplashScreen from '../screens/welcome/Splash';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
			<Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name='SignUp' component={SignUpStack} options={{ headerShown: false }} />
			<Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
			<Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

const HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
			<Stack.Screen name='Garden' component={GardenScreen} />
			<Stack.Screen name='Calendar' component={CalendarScreen} options={{ headerShown: false }} />
			<Stack.Screen name='SettingsStack' component={SettingsScreenStack} options={{ headerShown: false }} />
			<Stack.Screen name='Testing' component={TestingScreen} />
		</Stack.Navigator>
	);
};

export default function Navigation() {
	const { data: isLoggedIn, isLoading } = useIsLoggedIn();

	if (isLoading) return <SplashScreen />;

	return (
		<NavigationContainer theme={NavigatorTheme}>
			<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
				{!isLoggedIn ? (
					<Stack.Screen name='AuthStack' component={AuthStack} options={{ headerShown: false }} />
				) : (
					<Stack.Screen name='HomeStack' component={HomeStack} options={{ headerShown: false }} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
