import React from 'react';
import WalkthroughScreen from './signup';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import { View } from 'react-native';
import StepContainer from './components/StepContainer';
import Logo from '../../lib/icons/Logo';
import { Button } from 'react-native-paper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const Stack = createStackNavigator();

interface WelcomeScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
	return (
		<>
			<StepContainer navigation={navigation} canGoBack={false}>
				<Logo style={{ height: 250, width: 250 }} />
				<Button
					mode='outlined'
					style={{ width: '100%', maxWidth: 300, marginVertical: 10 }}
					onPress={() => {
						navigation.navigate('Walkthrough');
					}}
				>
					Sign Up
				</Button>
				<Button
					mode='text'
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					already have an account? log in
				</Button>
			</StepContainer>
		</>
	);
};

export default function WelcomeScreenStack() {
	return (
		<View style={{ flex: 1 }}>
			<Stack.Navigator>
				<Stack.Screen
					name='SignUp'
					component={WelcomeScreen}
					options={{
						headerShown: false,
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
						gestureEnabled: false,
					}}
				/>
			</Stack.Navigator>
		</View>
	);
}
