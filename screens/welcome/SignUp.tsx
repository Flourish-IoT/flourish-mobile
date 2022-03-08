import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Keyboard, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SsoServices from '../../lib/icons/SsoServices';
import { AppName, getServiceColor } from '../../lib/utils/helper';
import { isValidEmail, isValidPassword } from '../../lib/utils/validation';
import { useFinishAccountSetup, useVerifyEmail, useSendVerifyEmail } from '../../data/auth';
import RadioButton from '../../lib/components/styled/RadioButton';
import Confidence from '../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import StyledTextInput from '../../lib/components/styled/TextInput';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { GlobalStackNavOptions, Theme } from '../../providers/Theme';
import Button from '../../lib/components/styled/Button';
import Typography from '../../lib/components/styled/Typography';
import SegmentedList from '../../lib/components/styled/SegmentedList';

const Stack = createStackNavigator();

export const services = ['Apple', 'Facebook', 'Google', 'Email'] as const;
export type Service = typeof services[number];

interface StepProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const ContinueWithServiceStep = ({ navigation }: StepProps) => {
	const sendVerifyEmail = useSendVerifyEmail();

	const [username, setUsername] = useState('Jane Doe');
	const [email, setEmail] = useState('janedoe123@gmail.com');
	const [password, setPassword] = useState('abcdefg123');
	const [confirmPassword, setConfirmPassword] = useState('abcdefg123');

	const usernameIsValid = username.trim().length !== 0;
	const emailIsValid = isValidEmail(email);
	const passwordMatches = password === confirmPassword;
	const passwordIsSecure = isValidPassword(password);

	const formIsValid = passwordMatches && passwordIsSecure && emailIsValid && usernameIsValid;
	const disableNextBtn = !formIsValid;

	const getUsernameErrorMsg = () => {
		if (!usernameIsValid) return 'Display Name is required';
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

	const styles = StyleSheet.create({
		input: {
			backgroundColor: Theme.colors.background,
		},
	});

	return (
		<ScreenContainer
			appBarPadding={false}
			style={{ justifyContent: 'center', backgroundColor: 'white' }}
			onBack={navigation.goBack}
		>
			<Typography variant='h3bold' style={{ textAlign: 'center', marginBottom: Theme.spacing.md }}>
				Sign up to begin your journey with {AppName}
			</Typography>
			<SegmentedList style={{ marginBottom: Theme.spacing.md }}>
				<StyledTextInput
					label={getUsernameErrorMsg() ?? 'Display Name'}
					style={styles.input}
					onChangeText={setUsername}
					error={!!getUsernameErrorMsg()}
					value={username}
					left={<TextInput.Icon name='account' />}
				/>
				<StyledTextInput
					label={getEmailErrorMsg() ?? 'Email'}
					style={styles.input}
					onChangeText={setEmail}
					error={!!getEmailErrorMsg()}
					value={email}
					left={<TextInput.Icon name='email' />}
				/>
				<StyledTextInput
					label={getPasswordErrorMsg() ?? 'Password'}
					style={styles.input}
					secureTextEntry
					onChangeText={setPassword}
					error={!!getPasswordErrorMsg()}
					value={password}
					left={<TextInput.Icon name='lock' />}
				/>
				<StyledTextInput
					label={getPasswordConfirmErrorMsg() ?? 'Confirm Password'}
					style={styles.input}
					secureTextEntry
					onChangeText={setConfirmPassword}
					error={!!getPasswordConfirmErrorMsg()}
					value={confirmPassword}
					left={<TextInput.Icon name='lock' />}
				/>
			</SegmentedList>
			<Button
				variant='primary'
				title='Continue'
				onPress={() => handleSignUp('Email')}
				disabled={disableNextBtn}
				loading={formIsLoading}
				buttonStyle={{ marginBottom: Theme.spacing.md }}
			/>
			<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
				or sign up with
			</Typography>
			<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
				{services
					.filter((s) => s !== 'Email')
					.map((name) => (
						<Button
							key={name}
							variant='primary'
							onPress={() => handleSignUp(name)}
							icon={<SsoServices type={name} fill='white' height={30} />}
							buttonStyle={{ width: 100, borderRadius: Theme.borderRadius, backgroundColor: getServiceColor(name) }}
						/>
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
		<ScreenContainer
			appBarPadding={false}
			style={{ justifyContent: 'center', backgroundColor: 'white' }}
			onBack={navigation.goBack}
		>
			<Typography variant='h3bold' style={{ marginBottom: Theme.spacing.xl }}>
				Verification Code
			</Typography>
			<Typography variant='body' style={{ marginBottom: Theme.spacing.xl, textAlign: 'center' }}>
				We have sent a verification code to "{email}"
			</Typography>
			<SegmentedList style={{ marginBottom: Theme.spacing.xl }}>
				<StyledTextInput
					label='Security Code'
					keyboardType='numeric'
					maxLength={4}
					onChangeText={setCode}
					value={code}
					style={{ backgroundColor: Theme.colors.background }}
				/>
			</SegmentedList>
			<Typography variant='body' style={{ marginBottom: Theme.spacing.xl }}>
				Didn't receive a code?
			</Typography>
			<Button
				variant='text'
				onPress={onResend}
				title='Resend Code'
				disabled={disableResendBtn}
				loading={formIsLoading}
				buttonStyle={{ marginBottom: Theme.spacing.xl }}
			/>
			<Button
				variant='primary'
				title='Verify'
				onPress={onVerifyPress}
				disabled={disableVerifyBtn}
				loading={disableVerifyBtn && formIsLoading}
			/>
		</ScreenContainer>
	);
};

const RateExpertiseStep = ({ navigation }: StepProps) => {
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
							image: undefined,
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
		<ScreenContainer appBarPadding={false} style={{ justifyContent: 'center', backgroundColor: 'white' }}>
			<Typography variant='h3bold' style={{ marginBottom: Theme.spacing.md }}>
				How would you rate your confidence in caring for your plants?
			</Typography>
			<Confidence rating={userRating} style={{ marginBottom: Theme.spacing.md }} />
			<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
				{getConfidenceText(userRating)}
			</Typography>
			<View
				style={{
					height: 50,
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: Theme.spacing.md,
				}}
			>
				{ratings.map((r) => (
					<RadioButton key={r} isSelected={userRating === r} onPress={() => setUserRating(r)} />
				))}
			</View>
			<Button
				variant='primary'
				title='Submit'
				onPress={proceed}
				loading={formIsLoading}
				buttonStyle={{ marginBottom: Theme.spacing.md }}
			/>
			<Button
				variant='text'
				title='Skip for now'
				onPress={onSkipPress}
				loading={formIsLoading}
				buttonStyle={{ marginBottom: Theme.spacing.md }}
			/>
		</ScreenContainer>
	);
};

export default function SignUpStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				...GlobalStackNavOptions,
				cardStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Stack.Screen name={'ContinueWithService'} component={ContinueWithServiceStep} />
			<Stack.Screen name={'EmailVerification'} component={EmailVerificationStep} />
			<Stack.Screen name={'RateExpertise'} component={RateExpertiseStep} />
		</Stack.Navigator>
	);
}
