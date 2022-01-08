import React, { useEffect, useState } from 'react';
import Theme from '../../../lib/theme';
import { Button, Input } from 'react-native-elements';
import { View, Text, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from '../components/StepContainer';
import Facebook from '../../../lib/icons/Facebook';
import Google from '../../../lib/icons/Google';
import Apple from '../../../lib/icons/Apple';
import Email from '../../../lib/icons/Email';
import { AppName, isValidEmail, isValidPassword } from '../../../lib/utils/helper';
import { checkEmailVerificationCode, finishAccountSetup, sendEmailVerificationCode, setLoggedIn } from '../../../data/auth';
import RadioButton from '../../../lib/components/RadioButton';
import Confidence from '../../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import StepModal from '../components/StepModal';

const Stack = createStackNavigator();

export type Service = 'Facebook' | 'Google' | 'Apple' | 'Email';

interface ServiceObj {
	name: Service;
	icon: JSX.Element;
}

export const services: ServiceObj[] = [
	{
		name: 'Facebook',
		icon: <Facebook width={30} height={30} style={{ alignSelf: 'flex-start' }} />,
	},
	{
		name: 'Google',
		icon: <Google width={30} height={30} />,
	},
	{
		name: 'Apple',
		icon: <Apple width={30} height={30} />,
	},
	{
		name: 'Email',
		icon: <Email width={30} height={30} />,
	},
];

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
			{services.map(({ name, icon }) => (
				<Button
					key={name}
					icon={icon}
					title={`Continue with ${name}`}
					type='outline'
					onPress={() => handleSignUpWithService(name)}
					containerStyle={{ width: '100%', marginTop: 10 }}
				/>
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
	const disableNextBtn = !formIsValid || formIsLoading;

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
				title='Next'
				type={disableNextBtn ? 'outline' : 'solid'}
				onPress={onSubmit}
				containerStyle={{ width: '100%' }}
				disabled={disableNextBtn}
			/>
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
	const disableVerifyBtn = !formIsValid || formIsLoading || attempts > 0;
	const disableResendBtn = formIsLoading || attempts === 0;

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
			<Button title={'Resend Code'} type='clear' onPress={onResend} disabled={disableResendBtn} />
			<Button
				title='Verify'
				type={disableVerifyBtn ? 'outline' : 'solid'}
				onPress={onVerifyPress}
				containerStyle={{ width: '100%' }}
				disabled={disableVerifyBtn}
			/>
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
				<Button
					title='Submit'
					type='solid'
					onPress={proceed}
					containerStyle={{ width: '100%' }}
					disabled={formIsLoading}
				/>
				<Button title={'Skip for now'} type='clear' onPress={onSkipPress} disabled={formIsLoading} />
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
