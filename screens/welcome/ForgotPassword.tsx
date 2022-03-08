import React, { useEffect, useState } from 'react';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { useResetPassword, useSendResetPasswordEmail, useVerifyResetPasswordEmail } from '../../data/user';
import { isValidEmail, isValidPassword } from '../../lib/utils/validation';
import TextInput from '../../lib/components/styled/TextInput';
import { createStackNavigator } from '@react-navigation/stack';
import { Keyboard, View } from 'react-native';
import { GlobalStackNavOptions, Theme } from '../../providers/Theme';
import Typography from '../../lib/components/styled/Typography';
import SegmentedList from '../../lib/components/styled/SegmentedList';
import Button from '../../lib/components/styled/Button';

interface ForgotPasswordScreenProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

const Stack = createStackNavigator();

const EnterEmailStep = ({ navigation }: ForgotPasswordScreenProps) => {
	const sendResetPasswordEmail = useSendResetPasswordEmail();
	const [email, setEmail] = useState('');

	const onResetPasswordBtnPress = async () => {
		try {
			await sendResetPasswordEmail.mutateAsync({ email });
			navigation.navigate('Verify', { email });
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const emailIsValid = isValidEmail(email);

	return (
		<ScreenContainer appBarPadding={false} style={{ justifyContent: 'space-between' }}>
			<SegmentedList>
				<TextInput label='Your Email' value={email} disabled={sendResetPasswordEmail.isLoading} onChangeText={setEmail} />
			</SegmentedList>
			<Button
				variant='primary'
				title='Next'
				loading={sendResetPasswordEmail.isLoading}
				disabled={!emailIsValid}
				onPress={onResetPasswordBtnPress}
			/>
		</ScreenContainer>
	);
};

interface VerifyStepRouteProps {
	email: string;
}

const VerifyStep = ({ navigation, route }: ForgotPasswordScreenProps) => {
	const sendResetPasswordEmail = useSendResetPasswordEmail();
	const verifyResetPasswordEmail = useVerifyResetPasswordEmail();
	const { email } = route.params as VerifyStepRouteProps;

	const [resetCode, setResetCode] = useState<string>('2022');
	const [attempts, setAttempts] = useState(0);

	const formIsValid = String(resetCode).trim().length === 4;
	const disableVerifyBtn = !formIsValid || attempts > 0;
	const disableResendBtn = attempts === 0;

	useEffect(() => {
		formIsValid && Keyboard.dismiss();
	}, [resetCode]);

	const onResend = async () => {
		try {
			await sendResetPasswordEmail.mutateAsync({ email });
			alert('An email has been sent.');
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const onVerifyPress = async () => {
		try {
			await verifyResetPasswordEmail.mutateAsync({
				email,
				reset_code: resetCode,
			});
			navigation.reset({
				index: 0,
				routes: [{ name: 'ChangePassword', params: { resetCode } }],
			});
		} catch (error) {
			alert(`Error: ${error}`);
		}

		setAttempts(attempts + 1);
	};

	const formIsLoading = sendResetPasswordEmail.isLoading || verifyResetPasswordEmail.isLoading;

	return (
		<ScreenContainer appBarPadding={false} style={{ justifyContent: 'center' }}>
			<Typography variant='h3bold' style={{ marginBottom: Theme.spacing.md }}>
				Verification Code
			</Typography>
			<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
				We have sent a password reset code to "{email}"
			</Typography>
			<SegmentedList style={{ marginBottom: Theme.spacing.md }}>
				<TextInput
					label='Security Code'
					keyboardType='numeric'
					maxLength={4}
					onChangeText={setResetCode}
					value={resetCode}
				/>
			</SegmentedList>
			<Typography variant='body' style={{ marginBottom: Theme.spacing.md }}>
				Didn't receive a code?
			</Typography>
			<Button
				variant='text'
				title='Resend Code'
				onPress={onResend}
				disabled={disableResendBtn}
				loading={disableResendBtn && formIsLoading}
				buttonStyle={{ marginBottom: Theme.spacing.md }}
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

interface ChangePasswordScreenRouteProps {
	resetCode: string;
}

const ChangePasswordScreen = ({ navigation, route }: ForgotPasswordScreenProps) => {
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
	const resetPassword = useResetPassword();
	const { resetCode } = route.params as ChangePasswordScreenRouteProps;

	const onChangePasswordPress = async () => {
		try {
			await resetPassword.mutateAsync({ reset_code: resetCode, new_password: newPassword });
			navigation.navigate('Login');
			alert('Updated.');
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const disableUpdateBtn =
		newPassword.trim().length < 4 || newPasswordConfirm.trim().length === 0 || newPassword !== newPasswordConfirm;

	const getNewPasswordError = () => {
		if (newPassword.trim().length === 0) return undefined;
		if (!isValidPassword(newPassword)) return 'Minimum six characters and have at least one letter and one number';
		return undefined;
	};

	const getNewPasswordConfirmError = () => {
		if (newPasswordConfirm.trim().length === 0) return undefined;
		if (newPasswordConfirm !== newPassword) return 'Passwords do not match.';
		return undefined;
	};

	return (
		<ScreenContainer appBarPadding={false} style={{ justifyContent: 'space-between' }}>
			<View style={{ width: '100%' }}>
				<SegmentedList>
					<TextInput
						label={getNewPasswordError() ?? 'New password'}
						error={!!getNewPasswordError()}
						value={newPassword}
						disabled={resetPassword.isLoading}
						onChangeText={setNewPassword}
						secureTextEntry
					/>
					<TextInput
						label={getNewPasswordConfirmError() ?? 'Confirm new password'}
						error={!!getNewPasswordConfirmError()}
						value={newPasswordConfirm}
						disabled={resetPassword.isLoading}
						onChangeText={setNewPasswordConfirm}
						secureTextEntry
					/>
				</SegmentedList>
			</View>
			<Button
				variant='primary'
				loading={resetPassword.isLoading}
				disabled={disableUpdateBtn}
				onPress={onChangePasswordPress}
				title='Update'
			/>
		</ScreenContainer>
	);
};

export default function ForgotPasswordScreen() {
	return (
		<Stack.Navigator screenOptions={GlobalStackNavOptions}>
			<Stack.Screen name={'EnterEmail'} component={EnterEmailStep} options={{ title: 'Forgot Password' }} />
			<Stack.Screen name={'Verify'} component={VerifyStep} />
			<Stack.Screen name={'ChangePassword'} component={ChangePasswordScreen} />
		</Stack.Navigator>
	);
}
