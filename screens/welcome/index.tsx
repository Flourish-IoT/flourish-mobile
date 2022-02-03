import React from 'react';
import Logo from '../../lib/icons/Logo';
import { Button, Text } from 'react-native-paper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';

interface WelcomeScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
	return (
		<ScreenContainer style={{ justifyContent: 'center' }}>
			<Logo style={{ height: 250, width: 250 }} />
			<Button
				mode='outlined'
				style={{ width: '100%', maxWidth: 300, marginVertical: 10 }}
				onPress={() => {
					navigation.navigate('SignUp');
				}}
			>
				Get Started
			</Button>
			<Button
				mode='text'
				onPress={() => {
					navigation.navigate('Login');
				}}
			>
				Already have an account? log in
			</Button>
		</ScreenContainer>
	);
}
