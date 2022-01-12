import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { View, Text, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from './components/StepContainer';
import { AppName, isValidEmail, isValidPassword } from '../../lib/utils/helper';
import { checkEmailVerificationCode, sendEmailVerificationCode, setLoggedIn } from '../../data/auth';
import Confidence from '../../lib/icons/Confidence';
import { getConfidenceText, ConfidenceRating } from '../../data/user';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import SsoServices from '../../lib/icons/SsoServices';
import { Theme } from '../../providers/Theme';

const Stack = createStackNavigator();

type Service = 'Facebook' | 'Google' | 'Apple' | 'Email';

const services: Service[] = ['Facebook', 'Google', 'Apple', 'Email'];

interface StepParams {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const ContinueWithServiceStep = ({ navigation }: StepParams) => {
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
			{services.map(name => (
				<Button
					key={name}
					icon={() => <SsoServices type={name} />}
					mode='outlined'
					onPress={() => handleSignWithService(name)}
					style={{ width: '100%', marginTop: 10 }}
				>
					Continue with {name}
				</Button>
			))}
		</StepContainer>
	);
};

const SignUpWithEmailStep = ({ navigation }: StepParams) => {
	const [formIsLoading, setFormIsLoading] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

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
				// TODO: Remove the DEV BYPASS when the backend call is available
				navigation.navigate('EmailVerification', { email, password }); // DEV BYPASS
				// alert('There was an error while processing your request');
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
				mode={disableNextBtn ? 'outlined' : 'contained'}
				onPress={onSubmit}
				style={{ width: '100%' }}
				disabled={!formIsValid}
				loading={formIsLoading}
			>
				Next
			</Button>
		</StepContainer>
	);
};

const EmailVerificationStep = ({ route, navigation }: StepParams) => {
	// @ts-ignore
	const { email, password } = route.params;

	const [formIsLoading, setFormIsLoading] = useState(false);
	const [code, setCode] = useState<string>();
	const [attempts, setAttempts] = useState(0);

	const formIsValid = String(code).trim().length === 4;
	const disableVerifyBtn = !formIsValid || attempts > 0;

	useEffect(() => {
		formIsValid && Keyboard.dismiss();
	}, [code]);

	const onSubmit = async () => {
		setFormIsLoading(true);
		sendEmailVerificationCode(email, password)
			.then(res => {})
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
			<Text>Didn't receive a code</Text>
			<Button mode='text' onPress={onSubmit} loading={formIsLoading}>
				Resend Code
			</Button>
			<Button
				mode={disableVerifyBtn ? 'outlined' : 'contained'}
				onPress={onVerifyPress}
				style={{ width: '100%' }}
				disabled={disableVerifyBtn}
				loading={formIsLoading}
			>
				Verify
			</Button>
		</StepContainer>
	);
};

const RateExpertiseStep = ({ navigation }: StepParams) => {
	const [userRating, setUserRating] = useState<ConfidenceRating>(1);
	const ratings: ConfidenceRating[] = [1, 2, 3];

	const onSubmitPress = () => {};

	const onSkipPress = () => {};

	return (
		<>
			<StepContainer navigation={navigation}>
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
				<Button mode='contained' onPress={onSubmitPress} style={{ width: '100%' }}>
					Submit
				</Button>
				<Button mode='text' onPress={onSkipPress}>
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
		<View
			// Modal backdrop
			style={{ flex: 1, paddingVertical: '30%', paddingHorizontal: '5%', backgroundColor: Theme.colors.background }}
		>
			<View
				// Modal content
				style={{
					flex: 1,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 30,
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
