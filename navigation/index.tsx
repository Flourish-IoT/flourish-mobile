import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcome';
import { NavigatorTheme, GlobalStackNavOptions } from '../providers/Theme';
import ForgotPasswordScreen from '../screens/welcome/ForgotPassword';
import { navigationRef, isLoggedIn } from '../data/auth';
import LoginScreen from '../screens/welcome/Login';
import SignUpStack from '../screens/welcome/SignUp';
import SplashScreen from '../screens/welcome/Splash';
import AppBarStack from './AppBar';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={GlobalStackNavOptions}>
			<Stack.Screen name='Welcome' component={WelcomeScreen} />
			<Stack.Screen name='SignUp' component={SignUpStack} />
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
		</Stack.Navigator>
	);
};

export default function Navigation() {
	const [isLoading, setIsLoading] = useState(true);
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkIfLoggedIn = async () => {
			setUserIsLoggedIn(await isLoggedIn());
			setIsLoading(false);
		};
		checkIfLoggedIn();
	}, []);

	if (isLoading) return <SplashScreen />;

	return (
		<NavigationContainer theme={NavigatorTheme} ref={navigationRef}>
			<Stack.Navigator screenOptions={GlobalStackNavOptions} initialRouteName={userIsLoggedIn ? 'HomeStack' : 'AuthStack'}>
				<Stack.Screen name='AuthStack' component={AuthStack} />
				<Stack.Screen name='HomeStack' component={AppBarStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
