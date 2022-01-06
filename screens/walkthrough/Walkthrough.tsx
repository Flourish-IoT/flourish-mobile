import React from 'react';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import StepContainer from './components/StepContainer';
import Logo from '../../lib/icons/Logo';
import { getLoggedIn, setLoggedIn } from '../../lib/utils/helper';

const Stack = createStackNavigator();

const services = [
	{
		name: 'Facebook',
		icon: <Logo width={30} height={30} />,
	},
	{
		name: 'Google',
		icon: <Logo width={30} height={30} />,
	},
	{
		name: 'Apple',
		icon: <Logo width={30} height={30} />,
	},
	{
		name: 'Email',
		icon: <Logo width={30} height={30} />,
	},
];

export default function WalkthroughScreen({ navigation }) {
	const [stepNum, setSepNum] = useState(0);
	const nextStep = () => {
		const theNextStep = stepNum + 1;
		setSepNum(theNextStep);
	};

	const prevStep = () => {
		const theNextStep = stepNum - 1;
		setSepNum(theNextStep);
	};

	const attemptLogin = async () => {
		await setLoggedIn(true);
		setLoggedInState(await getLoggedIn());
	};

	const attemptLogout = async () => {
		await setLoggedIn(false);
		setLoggedInState(await getLoggedIn());
	};

	const onLoginPress = async () => {
		await setLoggedIn(true);
		const loggedIn = await getLoggedIn();
		setLoggedInState(loggedIn);

		loggedIn ? alert('Go to Home screen') : alert('Failed to log in');
	};

	const handleSignWithService = (service: string) => {
		// TODO: Show auth modal and handle
	};

	const steps = [
		{
			name: 'ContinueWithService',
			component: () => {
				return (
					<StepContainer>
						<Text>Sign up to begin your journey with flourish</Text>
						{services.map(({ name, icon }) => (
							<Button
								key={name}
								icon={icon}
								title={`Continue with ${name}`}
								type='outline'
								onPress={() => handleSignWithService(name.toUpperCase())}
								style={{ marginTop: 10, width: '100%' }}
							/>
						))}
					</StepContainer>
				);
			},
		},
		{
			name: 'EmailService',
			component: () => {
				return <Text>Email Service</Text>;
			},
		},
		{
			name: 'EmailVerification',
			component: () => {
				return <Text>Email Verification</Text>;
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
			style={{ flex: 1, paddingVertical: '30%', paddingHorizontal: '5%', backgroundColor: 'black' }}
		>
			<View
				// Modal content
				style={{
					flex: 1,
					backgroundColor: 'white',
					padding: 10,
					borderRadius: 10,
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
