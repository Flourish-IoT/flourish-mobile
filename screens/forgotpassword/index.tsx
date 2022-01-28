import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { useForgotPassword } from '../../data/user';
import { isValidEmail } from '../../lib/utils/validation';

interface ForgotPasswordScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
	const resetPassword = useForgotPassword();
	const [emailAddress, setEmailAddress] = useState('');
	const [emailSent, setEmailSent] = useState(false);

	const onResetPasswordBtnPress = async () => {
		try {
			await resetPassword.mutateAsync(emailAddress);
			setEmailSent(true);
			alert(`We have sent the instructions to ${emailAddress}.`);
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const emailIsValid = isValidEmail(emailAddress);

	const getEmailErrorMsg = () => {
		if (emailAddress.trim().length === 0) return undefined;
		if (!emailIsValid) return 'Email is invalid';
		return undefined;
	};

	return (
		<ScreenContainer scrolls={false} style={{ justifyContent: 'space-between' }}>
			<View>
				<TextInput
					label={getEmailErrorMsg() ?? 'Your Email'}
					error={!!getEmailErrorMsg()}
					value={emailAddress}
					disabled={resetPassword.isLoading}
					onChangeText={setEmailAddress}
				/>
			</View>
			<Button
				mode='contained'
				loading={resetPassword.isLoading}
				disabled={!emailIsValid || emailSent}
				onPress={onResetPasswordBtnPress}
			>
				Update
			</Button>
		</ScreenContainer>
	);
}
