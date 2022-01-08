import React, { useEffect, useState } from 'react';
import Theme from '../../../lib/theme';
import { Button, Input } from 'react-native-elements';
import { View, Text, Keyboard, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from '../components/StepContainer';
import Facebook from '../../../lib/icons/Facebook';
import Google from '../../../lib/icons/Google';
import Apple from '../../../lib/icons/Apple';
import Email from '../../../lib/icons/Email';
import { AppName, getLoggedIn, isValidEmail, isValidPassword, setLoggedIn } from '../../../lib/utils/helper';
import { checkEmailVerificationCode, sendEmailVerificationCode } from '../../../data/auth';
import RadioButton from '../../../lib/components/RadioButton';
import Confidence from '../../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

const Stack = createStackNavigator();

type Service = 'Facebook' | 'Google' | 'Apple' | 'Email';

interface ServiceObj {
	name: Service;
	icon: JSX.Element;
}

const services: ServiceObj[] = [
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
	const handleSignWithService = (service: Service) => {
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
					onPress={() => handleSignWithService(name)}
					containerStyle={{ width: '100%', marginTop: 10 }}
				/>
			))}
		</StepContainer>
	);
};

const SignUpWithEmailStep = ({ navigation }: StepProps) => {
	const [formIsLoading, setFormIsLoading] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

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

	const onLogoutPress = async () => {
		await setLoggedIn(false);
		setLoggedIn(false);
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
			<Input placeholder='Email' autoFocus onChangeText={setEmail} errorMessage={getEmailErrorMsg()} />
			<Input placeholder='Password' secureTextEntry onChangeText={setPassword} errorMessage={getPasswordErrorMsg()} />
			<Input
				placeholder='Confirm Password'
				secureTextEntry
				onChangeText={setConfirmPassword}
				errorMessage={getPasswordConfirmErrorMsg()}
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
	const [code, setCode] = useState<string>();
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
				setLoggedIn(true);
				navigation.navigate('RateExpertise');
			})
			.catch(error => {
				alert('There was an error while processing your request');
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
			<Input placeholder='Security Code' keyboardType='numeric' maxLength={4} onChangeText={setCode} />
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
	const [userRating, setUserRating] = useState<ConfidenceRating>(1);
	const ratings: ConfidenceRating[] = [1, 2, 3];

	const onSubmitPress = () => {};

	const onSkipPress = () => {};

	return (
		<>
			<StepContainer navigation={navigation} canGoBack={false}>
				<Text>How would you rate your confidence in caring for your plants?</Text>
				<Confidence rating={userRating} />
				<Text>{getConfidenceText(userRating)}</Text>
				<View
					style={{
						height: 100,
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					{/* <TouchableOpacity
						onPress={() => setUserRating(1)}
						style={{
							height: 30,
							width: 30,
							borderStyle: 'solid',
							borderColor: 'white',
							borderWidth: 10,
							borderRadius: 15,
							display: 'flex',
							backgroundColor: userRating === 1 ? 'black' : 'white',
						}}
					/>
					; */}
					{/* {ratings.map(btnRating => {
						<RadioButton
							key={btnRating}
							isSelected={btnRating === userRating}
							onPress={() => setUserRating(btnRating)}
						/>;
					})} */}
				</View>
				<Button title='Submit' type='solid' onPress={onSubmitPress} containerStyle={{ width: '100%' }} />
				<Button title={'Skip for now'} type='clear' onPress={onSkipPress} />
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
		<View
			// Modal backdrop
			style={{ flex: 1, paddingVertical: '30%', paddingHorizontal: '5%', backgroundColor: Theme.colors.secondary }}
		>
			<View
				// Modal content
				style={{
					flex: 1,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 30,
					overflow: 'hidden',
				}}
			>
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
			</View>
		</View>
	);
}
