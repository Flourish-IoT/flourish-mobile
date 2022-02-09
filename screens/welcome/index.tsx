import React from 'react';
import Logo from '../../lib/icons/Logo';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';
import Button from '../../lib/components/styled/Button';
import { Theme } from '../../providers/Theme';

interface WelcomeScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
	return (
		<ScreenContainer style={{ justifyContent: 'center' }}>
			<Logo style={{ height: 250, width: 250 }} />
			<Button
				variant='primary'
				buttonStyle={{ width: '100%', maxWidth: 300, marginVertical: Theme.spacing.md }}
				onPress={() => navigation.navigate('SignUp')}
				title='Get Started'
			/>
			<Button variant='text' onPress={() => navigation.navigate('Login')} title='Already have an account? Log in' />
		</ScreenContainer>
	);
}
