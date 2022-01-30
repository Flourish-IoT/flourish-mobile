import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome';
import { NavigatorTheme, GlobalNavigatorOptions } from '../providers/Theme';
import ForgotPasswordScreen from '../screens/welcome/ForgotPassword';
import { useIsLoggedIn } from '../data/auth';
import LoginScreen from '../screens/welcome/Login';
import SignUpStack from '../screens/welcome/SignUp';
import SplashScreen from '../screens/welcome/Splash';
import AppBarStack from './AppBar';

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

export default function Navigation() {
	const { data: isLoggedIn, isLoading } = useIsLoggedIn();

	if (isLoading) return <SplashScreen />;

	return (
		<NavigationContainer theme={NavigatorTheme}>
			<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
				{!isLoggedIn ? (
					<Stack.Screen name='AuthStack' component={AuthStack} options={{ headerShown: false }} />
				) : (
					<Stack.Screen name='HomeStack' component={AppBarStack} options={{ headerShown: false }} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
