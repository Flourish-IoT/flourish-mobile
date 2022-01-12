import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { View, Text, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from '../components/StepContainer';
import SsoServices from '../../../lib/icons/SsoServices';
import { AppName, isValidEmail, isValidPassword } from '../../../lib/utils/helper';
import { checkEmailVerificationCode, finishAccountSetup, sendEmailVerificationCode, setLoggedIn } from '../../../data/auth';
import RadioButton from '../../../lib/components/RadioButton';
import Confidence from '../../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import StepModal from '../components/StepModal';

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
			{services.map(name => (
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
	const [formIsLoading, setFormIsLoading] = useState(false);

	const [email, setEmail] = useState('user@gmail.com');
	const [password, setPassword] = useState('abcdefg123');
	const [confirmPassword, setConfirmPassword] = useState('abcdefg123');

	const emailIsValid = isValidEmail(email);
	const passwordMatches = password === confirmPassword;
	const passwordIsSecure = isValidPassword(password);

	const formIsValid = passwordMatches && passwordIsSecure && emailIsValid;
	const disableNextBtn = !formIsValid;

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
		setFormIsLoading(true);
		sendEmailVerificationCode(email, password)
			.then(res => {
				navigation.navigate('EmailVerification', { email, password });
			})
			.catch(error => {
				alert('There was an error while processing your request');
			})
			.finally(() => {
				setFormIsLoading(false);
			});
	};

	return (
		<StepContainer navigation={navigation}>
			<Text>Sign up with your email address</Text>
			<Input placeholder='Email' onChangeText={setEmail} errorMessage={getEmailErrorMsg()} value={email} />
			<Input
				placeholder='Password'
				secureTextEntry
				onChangeText={setPassword}
				errorMessage={getPasswordErrorMsg()}
				value={password}
			/>
			<Input
				placeholder='Confirm Password'
				secureTextEntry
				onChangeText={setConfirmPassword}
				errorMessage={getPasswordConfirmErrorMsg()}
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

const EmailVerificationStep = ({ route, navigation }: StepProps) => {
	// @ts-ignore
	const { email, password } = route.params;

	const [formIsLoading, setFormIsLoading] = useState(false);
	const [code, setCode] = useState<string>('2022');
	const [attempts, setAttempts] = useState(0);

	const formIsValid = String(code).trim().length === 4;
	const disableVerifyBtn = !formIsValid || attempts > 0;
	const disableResendBtn = attempts === 0;

	useEffect(() => {
		formIsValid && Keyboard.dismiss();
	}, [code]);

	const onResend = async () => {
		setFormIsLoading(true);
		sendEmailVerificationCode(email, password)
			.then(res => {
				setAttempts(0);
			})
			.catch(error => {
				alert('There was an error while processing your request');
			})
			.finally(() => {
				setFormIsLoading(false);
			});
	};

	const onVerifyPress = () => {
		setFormIsLoading(true);

		checkEmailVerificationCode(email, code)
			.then(async res => {
				await setLoggedIn(true);
				navigation.navigate('RateExpertise');
			})
			.catch(error => {
				alert('There was an error while processing your request');
				setAttempts(0);
			})
			.finally(() => {
				setFormIsLoading(false);
				setAttempts(attempts + 1);
			});
	};

	return (
		<StepContainer navigation={navigation}>
			<Text>Verification Code</Text>
			<Text>We have sent a verification code to "{email}"</Text>
			<Input placeholder='Security Code' keyboardType='numeric' maxLength={4} onChangeText={setCode} value={code} />
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
	const [formIsLoading, setFormIsLoading] = useState(false);
	const [userRating, setUserRating] = useState<ConfidenceRating>(1);
	const [skip, setSkip] = useState(false);
	const ratings: ConfidenceRating[] = [1, 2, 3];

	const onSkipPress = () => {
		setSkip(true);
		proceed();
	};

	const proceed = () => {
		setFormIsLoading(true);

		finishAccountSetup({ confidenceRating: skip ? null : userRating })
			.then(async res => {
				await setLoggedIn(true);
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
					{ratings.map(r => (
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
				{steps.map(s => (
					<Stack.Screen
						key={s.name}
						name={s.name}
						component={s.component}
						options={{
							headerShown: false,
						}}
					/>
				))}
			</Stack.Navigator>
		</StepModal>
	);
}
