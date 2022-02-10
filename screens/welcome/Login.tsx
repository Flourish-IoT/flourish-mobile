import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useLoginWithEmail } from '../../data/auth';
import ScreenContainer from '../../lib/components/ScreenContainer';
import Button from '../../lib/components/styled/Button';
import SegmentedList from '../../lib/components/styled/SegmentedList';
import StyledTextInput from '../../lib/components/styled/TextInput';
import Typography from '../../lib/components/styled/Typography';
import SsoServices from '../../lib/icons/SsoServices';
import { AppName } from '../../lib/utils/helper';
import { isValidEmail } from '../../lib/utils/validation';
import { Theme } from '../../providers/Theme';
import { Service, services } from './SignUp';

interface LoginScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const loginWithEmail = useLoginWithEmail();

	const [email, setEmail] = useState('janedoe123@gmail.com');
	const [password, setPassword] = useState('abcdJaneefg123');

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
			navigation.reset({
				index: 0,
				routes: [{ name: 'HomeStack' }],
			});
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const emailIsValid = isValidEmail(email);
	const formIsLoading = loginWithEmail.isLoading;

	return (
		<ScreenContainer appBarPadding={false} style={{ justifyContent: 'center' }}>
			<Typography variant='heading3Bold' style={{ textAlign: 'center', marginBottom: Theme.spacing.md }}>
				Sign in to continue your journey with {AppName}
			</Typography>
			<SegmentedList style={{ marginBottom: Theme.spacing.md }}>
				<StyledTextInput label={'Email'} onChangeText={setEmail} value={email} left={<TextInput.Icon name='email' />} />
				<StyledTextInput
					label={'Password'}
					secureTextEntry
					onChangeText={setPassword}
					value={password}
					left={<TextInput.Icon name='lock' />}
				/>
			</SegmentedList>
			<Button
				variant='primary'
				onPress={onSubmit}
				title='Sign in'
				disabled={!emailIsValid}
				loading={formIsLoading}
				buttonStyle={{ marginBottom: Theme.spacing.md }}
			/>
			<Typography variant='heading3Bold' style={{ marginBottom: Theme.spacing.md }}>
				or sign in with
			</Typography>
			<View
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: Theme.spacing.md,
				}}
			>
				{services
					.filter((s) => s !== 'Email')
					.map((name) => (
						<Button
							key={name}
							variant='primary'
							onPress={() => handleSignInWithService(name)}
							icon={<SsoServices type={name} fill='white' height={30} />}
							buttonStyle={{ width: 100, borderRadius: Theme.borderRadius }}
						/>
					))}
			</View>
			<Button
				variant='text'
				title='Forgot Password'
				onPress={() => navigation.navigate('ForgotPassword')}
				buttonStyle={{ alignSelf: 'flex-start' }}
			/>
		</ScreenContainer>
	);
}
