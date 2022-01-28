import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useQueryClient } from 'react-query';
import { useLoginWithEmail } from '../../data/auth';
import ScreenContainer from '../../lib/components/ScreenContainer';
import TextInput from '../../lib/components/styled/TextInput';
import SsoServices from '../../lib/icons/SsoServices';
import { AppName } from '../../lib/utils/helper';
import { isValidEmail } from '../../lib/utils/validation';
import { Service, services } from './SignUp';

interface LoginScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const queryClient = useQueryClient();
	const loginWithEmail = useLoginWithEmail();

	const [email, setEmail] = useState('user@gmail.com');
	const [password, setPassword] = useState('abcdefg123');

	const handleSignInWithService = (service: Service) => {
		switch (service) {
			case 'Facebook':
				alert(service + ' SSO is not set up yet.');
				break;
			case 'Google':
				alert(service + ' SSO is not set up yet.');
				break;
			case 'Apple':
				alert(service + ' SSO is not set up yet.');
				break;
		}
	};

	const onSubmit = async () => {
		try {
			await loginWithEmail.mutateAsync({ email, password });
			queryClient.setQueryData(['loggedIn'], () => true);
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const emailIsValid = isValidEmail(email);
	const formIsLoading = loginWithEmail.isLoading;

	return (
		<ScreenContainer style={{ justifyContent: 'center' }}>
			<Text>Sign in to continue your journey with {AppName}</Text>
			<TextInput label={'Email'} onChangeText={setEmail} value={email} />
			<TextInput label={'Password'} secureTextEntry onChangeText={setPassword} value={password} />
			<Button
				mode={!emailIsValid ? 'outlined' : 'contained'}
				onPress={onSubmit}
				disabled={!emailIsValid}
				loading={formIsLoading}
			>
				Sign in
			</Button>
			<Text>or sign in with</Text>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				{services
					.filter((s) => s !== 'Email')
					.map((name, index) => (
						<Button
							key={name}
							mode='contained'
							onPress={() => handleSignInWithService(name)}
							style={{ flex: 1, marginLeft: index === 0 ? 0 : 20 }}
						>
							<SsoServices type={name} fill='white' height={30} />
						</Button>
					))}
			</View>
			<Button mode='text' onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-start' }}>
				Forgot Password
			</Button>
		</ScreenContainer>
	);
}
