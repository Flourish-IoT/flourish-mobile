import React, { useEffect, useState } from 'react';
import WalkthroughScreen from './signup';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './Login';
import { View } from 'react-native';
import StepContainer from './components/StepContainer';
import { AppName } from '../../lib/utils/helper';
import Logo from '../../lib/icons/Logo';
import { Button } from 'react-native-elements';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getLoggedIn } from '../../data/auth';

const Stack = createStackNavigator();

interface WelcomeScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const WelcomeScreen = ({ navigation, ...rest }: WelcomeScreenProps) => {
	const [loggedInState, setLoggedInState] = useState(false);

	useEffect(() => {
		async () => {
			setLoggedInState(await getLoggedIn());
		};
	}, [navigation]);

	return (
		<>
			<StepContainer navigation={navigation} canGoBack={false}>
				<Logo />
				<Button
					title='Sign Up'
					type='outline'
					containerStyle={{ width: '100%', maxWidth: 300, marginVertical: 10 }}
					onPress={() => {
						navigation.navigate('Walkthrough');
					}}
				/>
				<Button
					title='already have an account? log in'
					type='clear'
					onPress={() => {
						navigation.navigate('Login');
					}}
				/>
			</StepContainer>
		</>
	);
};

export default function WelcomeScreenStack() {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar style='dark' />
			<Stack.Navigator>
				<Stack.Screen
					name='SignUp'
					component={WelcomeScreen}
					options={{
						headerTitle: AppName,
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
