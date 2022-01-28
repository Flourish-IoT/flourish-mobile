import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { View, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from '../components/StepContainer';
import SsoServices from '../../../lib/icons/SsoServices';
import { AppName } from '../../../lib/utils/helper';
import { isValidEmail, isValidPassword, isValidUsername } from '../../../lib/utils/validation';
import {
	useFinishAccountSetup,
	setUserId,
	useCheckEmailVerificationCode,
	useSendEmailVerificationCode,
} from '../../../data/auth';
import RadioButton from '../../../lib/components/styled/RadioButton';
import Confidence from '../../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import StepModal from '../components/StepModal';
import TextInput from '../../../lib/components/styled/TextInput';

const Stack = createStackNavigator();

export type Service = 'Facebook' | 'Google' | 'Apple' | 'Email';

export const services: Service[] = ['Facebook', 'Google', 'Apple', 'Email'];

interface StepProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const ContinueWithServiceStep = ({ navigation }: StepProps) => {
	const handleSignUpWithService = (service: Service) => {
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
			case 'Email':
				navigation.navigate('SignUpWithEmail');
				break;
		}
	};

	return (
		<StepContainer navigation={navigation}>
			<Text>Sign up to begin your journey with {AppName}</Text>
			{services.map((name) => (
				<Button
					key={name}
					icon={() => <SsoServices type={name} />}
					mode='outlined'
					onPress={() => handleSignUpWithService(name)}
					style={{ width: '100%', marginTop: 10 }}
				>
					Continue with {name}
				</Button>
			))}
		</StepContainer>
	);
};

const SignUpWithEmailStep = ({ navigation }: StepProps) => {
	const sendEmailVerificationCode = useSendEmailVerificationCode();

	const [username, setUsername] = useState('Gabby');
	const [email, setEmail] = useState('user@gmail.com');
	const [password, setPassword] = useState('abcdefg123');
	const [confirmPassword, setConfirmPassword] = useState('abcdefg123');

	const usernameIsValid = isValidUsername(username);
	const emailIsValid = isValidEmail(email);
	const passwordMatches = password === confirmPassword;
	const passwordIsSecure = isValidPassword(password);

	const formIsValid = passwordMatches && passwordIsSecure && emailIsValid && usernameIsValid;
	const disableNextBtn = !formIsValid;

	const getUsernameErrorMsg = () => {
		if (email.trim().length === 0) return undefined;
		if (!emailIsValid) return 'Username is invalid';
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
		if (!passwordMatches) return 'Passwords do no match';
		return undefined;
	};

	const onSubmit = async () => {
		try {
			await sendEmailVerificationCode.mutateAsync({ email, username, password });
			navigation.navigate('EmailVerification', { email, username, password });
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const formIsLoading = sendEmailVerificationCode.isLoading;

	return (
		<StepContainer navigation={navigation}>
			<Text>Sign up with your email address</Text>
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
				onPress={onSubmit}
				style={{ width: '100%' }}
				disabled={disableNextBtn}
				loading={formIsLoading}
			>
				Next
			</Button>
		</StepContainer>
	);
};

interface EmailVerificationStepProps {
	email: string;
	username: string;
	password: string;
}

const EmailVerificationStep = ({ route, navigation }: StepProps) => {
	const sendEmailVerificationCode = useSendEmailVerificationCode();
	const checkEmailVerificationCode = useCheckEmailVerificationCode();
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
			await sendEmailVerificationCode.mutateAsync({ email, username, password });
			alert('An email has been sent.');
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const onVerifyPress = async () => {
		try {
			const { data: user } = await checkEmailVerificationCode.mutateAsync({ email, code });
			await setUserId(user.id);
			navigation.reset({
				index: 0,
				routes: [{ name: 'RateExpertise' }],
			});
		} catch (error) {
			alert(`Error: ${error}`);
		}

		setAttempts(attempts + 1);
	};

	const formIsLoading = sendEmailVerificationCode.isLoading || checkEmailVerificationCode.isLoading;

	return (
		<StepContainer navigation={navigation}>
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
				style={{ width: '100%' }}
			>
				Verify
			</Button>
		</StepContainer>
	);
};

const RateExpertiseStep = ({ navigation }: StepProps) => {
	const finishAccountSetup = useFinishAccountSetup();
	const [formIsLoading, setFormIsLoading] = useState(false);
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
				routes: [{ name: 'Garden' }],
			});
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	return (
		<>
			<StepContainer navigation={navigation} canGoBack={false}>
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
			</StepContainer>
		</>
	);
};

interface WalkthroughStep {
	name: string;
	component: (props) => JSX.Element;
}

const steps: WalkthroughStep[] = [
	{
		name: 'ContinueWithService',
		component: ContinueWithServiceStep,
	},
	{
		name: 'SignUpWithEmail',
		component: SignUpWithEmailStep,
	},
	{
		name: 'EmailVerification',
		component: EmailVerificationStep,
	},
	{
		name: 'RateExpertise',
		component: RateExpertiseStep,
	},
];

export default function WalkthroughScreen() {
	return (
		<StepModal>
			<Stack.Navigator>
				{steps.map((s) => (
					<Stack.Screen
						key={s.name}
						name={s.name}
						component={s.component}
						options={{
							headerShown: false,
							gestureEnabled: false,
						}}
					/>
				))}
			</Stack.Navigator>
		</StepModal>
	);
}
