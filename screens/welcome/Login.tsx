import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { attemptEmailLogin, setAccessToken } from '../../data/auth';
import { AppName } from '../../lib/utils/helper';
import StepContainer from './components/StepContainer';
import StepModal from './components/StepModal';
import { Service, services } from './signup';

interface LoginScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const [formIsLoading, setFormIsLoading] = useState(false);

	const [email, setEmail] = useState('user@gmail.com');
	const [password, setPassword] = useState('abcdefg123');

	const handleSignInWithService = (service: Service) => {
		switch (service) {
			case 'Facebook':
				alert(service + ' SSO is not setup.');
				break;
			case 'Google':
				alert(service + ' SSO is not setup.');
				break;
			case 'Apple':
				alert(service + ' SSO is not setup.');
				break;
		}
	};

	const onSubmit = async () => {
		setFormIsLoading(true);
		attemptEmailLogin(email, password)
			.then(async ({ data: accessToken }) => {
				await setAccessToken(accessToken);
				navigation.navigate('Garden');
			})
			.catch(error => {
				alert('There was an error while processing your request');
			})
			.finally(() => {
				setFormIsLoading(false);
			});
	};

	return (
		<StepModal>
			<StepContainer navigation={navigation}>
				<Text>Sign in to continue with {AppName}</Text>
				{services
					.filter(s => s.name !== 'Email')
					.map(({ name, icon }) => (
						<Button
							key={name}
							icon={icon}
							title={`Continue with ${name}`}
							type='outline'
							onPress={() => handleSignInWithService(name)}
							containerStyle={{ width: '100%', marginTop: 10 }}
						/>
					))}
				<Text>Sign up with your email address</Text>
				<Input placeholder='Email' onChangeText={setEmail} value={email} />
				<Input placeholder='Password' secureTextEntry onChangeText={setPassword} value={password} />
				<Button title='Next' onPress={onSubmit} containerStyle={{ width: '100%' }} disabled={formIsLoading} />
				<Button
					title='Forgot Password'
					type='clear'
					onPress={() => navigation.navigate('ForgotPassword')}
					containerStyle={{ alignSelf: 'flex-start' }}
				/>
			</StepContainer>
		</StepModal>
	);
}
