import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { View, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SsoServices from '../../lib/icons/SsoServices';
import { AppName } from '../../lib/utils/helper';
import { isValidEmail, isValidPassword } from '../../lib/utils/validation';
import { useFinishAccountSetup, useVerifyEmail, useSendVerifyEmail } from '../../data/auth';
import RadioButton from '../../lib/components/styled/RadioButton';
import Confidence from '../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import TextInput from '../../lib/components/styled/TextInput';
import { useQueryClient } from 'react-query';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { GlobalStackNavOptions } from '../../providers/Theme';

const Stack = createStackNavigator();

export type Service = 'Apple' | 'Facebook' | 'Google' | 'Email';

export const services: Service[] = ['Apple', 'Facebook', 'Google', 'Email'];

interface StepProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const ContinueWithServiceStep = ({ navigation }: StepProps) => {
	const sendVerifyEmail = useSendVerifyEmail();

	const [username, setUsername] = useState('Gabby');
	const [email, setEmail] = useState('user@gmail.com');
	const [password, setPassword] = useState('abcdefg123');
	const [confirmPassword, setConfirmPassword] = useState('abcdefg123');

	const usernameIsValid = username.trim().length !== 0;
	const emailIsValid = isValidEmail(email);
	const passwordMatches = password === confirmPassword;
	const passwordIsSecure = isValidPassword(password);

	const formIsValid = passwordMatches && passwordIsSecure && emailIsValid && usernameIsValid;
	const disableNextBtn = !formIsValid;

	const getUsernameErrorMsg = () => {
		if (!usernameIsValid) return 'Username is required';
		return undefined;
	};

	const getEmailErrorMsg = () => {
		if (email.trim().length === 0) return undefined;
		if (!emailIsValid) return 'Email is invalid';
		return undefined;
	};

	const getPasswordErrorMsg = () => {
		if (password.trim().length === 0) return undefined;
		if (!passwordIsSecure) return 'Minimum six characters and have at least one letter and one number';
		return undefined;
	};

	const getPasswordConfirmErrorMsg = () => {
		if (confirmPassword.trim().length === 0) return undefined;
		if (!passwordMatches) return 'Passwords do not match';
		return undefined;
	};

	const formIsLoading = sendVerifyEmail.isLoading;

	const handleSignUp = async (service: Service) => {
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
			case 'Email':
				try {
					await sendVerifyEmail.mutateAsync({ email, username, password });
					navigation.navigate('EmailVerification', { email, username, password });
				} catch (error) {
					alert(`Error: ${error}`);
				}
				break;
		}
	};

	return (
		<ScreenContainer style={{ justifyContent: 'center' }}>
			<Text>Sign up to begin your journey with {AppName}</Text>
			<TextInput
				label={getUsernameErrorMsg() ?? 'Display Name'}
				onChangeText={setUsername}
				error={!!getUsernameErrorMsg()}
				value={username}
			/>
			<TextInput label={getEmailErrorMsg() ?? 'Email'} onChangeText={setEmail} error={!!getEmailErrorMsg()} value={email} />
			<TextInput
				label={getPasswordErrorMsg() ?? 'Password'}
				secureTextEntry
				onChangeText={setPassword}
				error={!!getPasswordErrorMsg()}
				value={password}
			/>
			<TextInput
				label={getPasswordConfirmErrorMsg() ?? 'Confirm Password'}
				secureTextEntry
				onChangeText={setConfirmPassword}
				error={!!getPasswordConfirmErrorMsg()}
				value={confirmPassword}
			/>
			<Button
				mode={disableNextBtn ? 'outlined' : 'contained'}
				onPress={() => handleSignUp('Email')}
				style={{ width: '50%' }}
				disabled={disableNextBtn}
				loading={formIsLoading}
			>
				Continue
			</Button>
			<Text>or sign up with</Text>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				{services
					.filter((s) => s !== 'Email')
					.map((name, index) => (
						<Button
							key={name}
							mode='contained'
							onPress={() => handleSignUp(name)}
							style={{ flex: 1, marginLeft: index === 0 ? 0 : 20 }}
						>
							<SsoServices type={name} fill='white' height={30} />
						</Button>
					))}
			</View>
		</ScreenContainer>
	);
};

interface EmailVerificationStepProps {
	email: string;
	username: string;
	password: string;
}

const EmailVerificationStep = ({ route, navigation }: StepProps) => {
	const sendVerifyEmail = useSendVerifyEmail();
	const verifyEmail = useVerifyEmail();
	const { email, username, password } = route.params as EmailVerificationStepProps;

	const [code, setCode] = useState<string>('2022');
	const [attempts, setAttempts] = useState(0);

	const formIsValid = String(code).trim().length === 4;
	const disableVerifyBtn = !formIsValid || attempts > 0;
	const disableResendBtn = attempts === 0;

	useEffect(() => {
		formIsValid && Keyboard.dismiss();
	}, [code]);

	const onResend = async () => {
		try {
			await sendVerifyEmail.mutateAsync({ email, username, password });
			setAttempts(attempts + 1);
			alert('An email has been sent.');
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const onVerifyPress = async () => {
		try {
			await verifyEmail.mutateAsync({ email, code });
			navigation.reset({
				index: 0,
				routes: [{ name: 'RateExpertise' }],
			});
		} catch (error) {
			alert(`Error: ${error}`);
		}

		setAttempts(attempts + 1);
	};

	const formIsLoading = sendVerifyEmail.isLoading || verifyEmail.isLoading;

	return (
		<ScreenContainer style={{ justifyContent: 'center' }}>
			<Text>Verification Code</Text>
			<Text>We have sent a verification code to "{email}"</Text>
			<TextInput label='Security Code' keyboardType='numeric' maxLength={4} onChangeText={setCode} value={code} />
			<Text>Didn't receive a code?</Text>
			<Button mode='text' onPress={onResend} disabled={disableResendBtn} loading={disableResendBtn && formIsLoading}>
				Resend Code
			</Button>
			<Button
				mode={disableVerifyBtn ? 'outlined' : 'contained'}
				onPress={onVerifyPress}
				disabled={disableVerifyBtn}
				loading={disableVerifyBtn && formIsLoading}
			>
				Verify
			</Button>
		</ScreenContainer>
	);
};

const RateExpertiseStep = ({ navigation }: StepProps) => {
	const queryClient = useQueryClient();
	const finishAccountSetup = useFinishAccountSetup();
	const [userRating, setUserRating] = useState<ConfidenceRating>(1);
	const [skip, setSkip] = useState(false);
	const ratings: ConfidenceRating[] = [1, 2, 3];

	const onSkipPress = () => {
		setSkip(true);
		proceed();
	};

	const proceed = async () => {
		try {
			await finishAccountSetup.mutateAsync(
				skip
					? undefined
					: {
							preferences: {
								confidence_rating: userRating,
								unit_preference: 'Fahrenheit',
							},
					  }
			);
			navigation.reset({
				index: 0,
				routes: [{ name: 'HomeStack' }],
			});
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const formIsLoading = finishAccountSetup.isLoading;

	return (
		<ScreenContainer style={{ justifyContent: 'center' }}>
			<Text>How would you rate your confidence in caring for your plants?</Text>
			<Confidence rating={userRating} />
			<Text>{getConfidenceText(userRating)}</Text>
			<View
				style={{
					height: 50,
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				{ratings.map((r) => (
					<RadioButton key={r} isSelected={userRating === r} onPress={() => setUserRating(r)} />
				))}
			</View>
			<Button mode='contained' onPress={proceed} style={{ width: '100%' }} loading={formIsLoading}>
				Submit
			</Button>
			<Button mode='text' onPress={onSkipPress} loading={formIsLoading}>
				Skip for now
			</Button>
		</ScreenContainer>
	);
};

export default function SignUpStack() {
	return (
		<Stack.Navigator screenOptions={GlobalStackNavOptions}>
			<Stack.Screen name={'ContinueWithService'} component={ContinueWithServiceStep} />
			<Stack.Screen name={'EmailVerification'} component={EmailVerificationStep} />
			<Stack.Screen name={'RateExpertise'} component={RateExpertiseStep} />
		</Stack.Navigator>
	);
}
