import React, { useEffect, useState } from 'react';
import Theme from '../../lib/theme';
import { Button, Input } from 'react-native-elements';
import { View, Text, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from './components/StepContainer';
import Facebook from '../../lib/icons/Facebook';
import Google from '../../lib/icons/Google';
import Apple from '../../lib/icons/Apple';
import Email from '../../lib/icons/Email';
import { getLoggedIn, isValidEmail, isValidPassword, setLoggedIn } from '../../lib/utils/helper';
import { checkEmailVerificationCode, sendEmailVerificationCode } from '../../data/auth';

const Stack = createStackNavigator();

interface ServiceObj {
	name: Service;
	icon: JSX.Element;
}

type Service = 'Facebook' | 'Google' | 'Apple' | 'Email';

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

export default function WalkthroughScreen({ navigation }) {
	const [stepNum, setSepNum] = useState(0);

	const prevStep = () => {
		const theNextStep = stepNum - 1;
		setSepNum(theNextStep);
	};

	const nextStep = () => {
		const theNextStep = stepNum + 1;
		setSepNum(theNextStep);
	};

	const steps = [
		{
			name: 'ContinueWithService',
			component: () => {
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
						<Text>Sign up to begin your journey with Flourish</Text>
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
			},
		},
		{
			name: 'SignUpWithEmail',
			component: ({ navigation }) => {
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
					if (!emailIsValid) return 'Email is invald';
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
					setLoggedInState(false);
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
						<Input
							placeholder='Password'
							secureTextEntry
							onChangeText={setPassword}
							errorMessage={getPasswordErrorMsg()}
						/>
						<Input
							placeholder='Confirm Password'
							secureTextEntry
							onChangeText={setConfirmPassword}
							errorMessage={getPasswordConfirmErrorMsg()}
						/>
						<Button
							title={'Next'}
							type={disableNextBtn ? 'outline' : 'solid'}
							onPress={onSubmit}
							containerStyle={{ width: '100%' }}
							disabled={disableNextBtn}
						/>
					</StepContainer>
				);
			},
		},
		{
			name: 'EmailVerification',
			component: ({ route, navigation }) => {
				const { email, password } = route.params;

				const [formIsLoading, setFormIsLoading] = useState(false);
				const [code, setCode] = useState<string>();
				const [attempts, setAttempts] = useState(0);

				const formIsValid = String(code).trim().length === 4;
				const disableVeryifyBtn = !formIsValid || formIsLoading || attempts > 0;

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
							setLoggedInState(true);
							navigation.navigate('RateExpertise');
						})
						.catch(error => {
							// TODO: Remove the DEV BYPASS when the backend call is available
							navigation.navigate('RateExpertise'); // DEV BYPASS
							// alert('There was an error while processing your request');
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
						<Button title={'Resend Code'} type='clear' onPress={onSubmit} disabled={formIsLoading} />
						<Button
							title={'Verify'}
							type={disableVeryifyBtn ? 'outline' : 'solid'}
							onPress={onVerifyPress}
							containerStyle={{ width: '100%' }}
							disabled={disableVeryifyBtn}
						/>
					</StepContainer>
				);
			},
		},
		{
			name: 'RateExpertise',
			component: () => {
				return <Text>Rate Expertise</Text>;
			},
		},
	];

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
				}}
			>
				<Stack.Navigator>
					{steps.map((s, sIndex) => (
						<Stack.Screen
							key={s.name}
							name={s.name}
							component={s.component}
							options={{
								headerShown: false,
							}}
						/>
					))}
					{/* {stepNum !== 0 && (
						<View
							style={{
								flexDirection: 'row',
							}}
						>
							<Button title='Back' type='outline' onPress={prevStep} style={{ marginRight: 10 }} />
							<Button title={stepNum === steps.length ? 'Complete' : 'Next'} type='outline' onPress={nextStep} />
						</View>
					)} */}
				</Stack.Navigator>
			</View>
		</View>
	);
}
function setLoggedInState(loggedIn: boolean) {
	throw new Error('Function not implemented.');
}
