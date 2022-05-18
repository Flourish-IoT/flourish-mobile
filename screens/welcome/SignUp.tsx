import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SsoServices from '../../lib/icons/SsoServices';
import { AppName, getServiceColor } from '../../lib/utils/helper';
import { isValidEmail, isValidPassword } from '../../lib/utils/validation';
import { useVerifyEmail, useSendVerifyEmail } from '../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import StyledTextInput from '../../lib/components/styled/TextInput';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import { GlobalStackNavOptions, Theme } from '../../providers/Theme';
import Button from '../../lib/components/styled/Button';
import Typography from '../../lib/components/styled/Typography';
import SegmentedList from '../../lib/components/layout/SegmentedList';
import Tos from './components/Tos';
import VerificationCodeField from '../../lib/components/VerificationCodeField';

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
		screenContainer: {
			justifyContent: 'space-between',
			backgroundColor: 'white',
		},
		title: {
			textAlign: 'center',
			marginBottom: Theme.spacing.md,
		},
		segmentedList: {
			marginBottom: Theme.spacing.md,
		},
		input: {
			backgroundColor: '#EEF8F6',
		},
		servicesContainer: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: Theme.spacing.md,
		},
		serviceButton: {
			width: 100,
			borderRadius: Theme.borderRadius,
		},
	});

	return (
		<ScreenContainer appBarPadding={false} style={styles.screenContainer} onBack={navigation.goBack}>
			<Typography variant='h3bold' style={styles.title}>
				Sign up to begin your journey with {AppName}
			</Typography>
			<SegmentedList containerStyle={styles.segmentedList}>
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
			<View style={styles.servicesContainer}>
				{services
					.filter((s) => s !== 'Email')
					.map((name, index) => (
						<Button
							key={index + name}
							variant='primary'
							onPress={() => handleSignUp(name)}
							icon={<SsoServices type={name} fill='white' height={30} />}
							buttonStyle={{ ...styles.serviceButton, backgroundColor: getServiceColor(name) }}
						/>
					))}
			</View>
			<Tos />
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

	const [code, setCode] = useState<number[]>([null, null, null, null]);
	const [attempts, setAttempts] = useState(0);

	const formIsValid = !code.some((n) => n === null);
	const disableVerifyBtn = !formIsValid || attempts > 0;
	const disableResendBtn = attempts === 0;

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
				routes: [{ name: 'HomeStack' }],
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
			style={{ justifyContent: 'space-between', backgroundColor: 'white' }}
			onBack={navigation.goBack}
		>
			<Typography variant='h1' style={{ marginBottom: Theme.spacing.xl }}>
				Verification
			</Typography>
			<Typography variant='body' style={{ marginBottom: Theme.spacing.xl, textAlign: 'center' }}>
				We have sent a verification code to the email {email}
			</Typography>
			<VerificationCodeField
				onInput={setCode}
				value={code}
				containerStyle={{ marginBottom: Theme.spacing.xl }}
				disabled={formIsLoading}
			/>
			<View style={{ alignItems: 'center' }}>
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
			</View>
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

const Stack = createStackNavigator();

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
		</Stack.Navigator>
	);
}
