import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { getLoggedIn } from '../../lib/utils/helper';
import Logo from '../../lib/icons/Logo';
import StepContainer from './components/StepContainer';

export default function SignUpScreen({ navigation }) {
	const [loggedInState, setLoggedInState] = useState(false);

	useEffect(() => {
		async () => {
			setLoggedInState(await getLoggedIn());
		};
	}, [navigation]);

	return (
		<>
			<StepContainer>
				<Logo />
				<Button
					title='Sign Up'
					type='outline'
					onPress={() => {
						navigation.navigate('Walkthrough');
					}}
				/>
				<Button
					title='already have an account? log in'
					type='clear'
					onPress={() => {
						navigation.navigate('LoginScreen');
					}}
				/>
			</StepContainer>
		</>
	);
}
