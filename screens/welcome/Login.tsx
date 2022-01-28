import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { useLoginWithEmail, setAccessToken } from '../../data/auth';
import TextInput from '../../lib/components/styled/TextInput';
import SsoServices from '../../lib/icons/SsoServices';
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
		useLoginWithEmail(email, password)
			.then(async ({ data: accessToken }) => {
				await setAccessToken(accessToken);
				navigation.reset({
					index: 0,
					routes: [{ name: 'Garden' }],
				});
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
					.filter(s => s !== 'Email')
					.map(name => (
						<Button
							key={name}
							icon={() => <SsoServices type={name} />}
							mode='outlined'
							onPress={() => handleSignInWithService(name)}
							style={{ width: '100%', marginTop: 10 }}
						>
							Continue with {name}
						</Button>
					))}
				<Text>Sign up with your email address</Text>
				<TextInput label='Email' value={email} onChangeText={setEmail} />
				<TextInput label='Password' value={password} onChangeText={setPassword} secureTextEntry />
				<Button onPress={onSubmit} style={{ width: '100%' }} disabled={formIsLoading}>
					Next
				</Button>
				<Button mode='text' onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-start' }}>
					Forgot Password
				</Button>
			</StepContainer>
		</StepModal>
	);
}
