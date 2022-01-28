import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { useForgotPassword } from '../../data/user';
import { isValidEmail } from '../../lib/utils/validation';
import TextInput from '../../lib/components/styled/TextInput';

interface ForgotPasswordScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
	const resetPassword = useForgotPassword();
	const [emailAddress, setEmailAddress] = useState('');

	const onResetPasswordBtnPress = async () => {
		try {
			await resetPassword.mutateAsync(emailAddress);
			navigation.goBack();
			alert(`We have sent the instructions to ${emailAddress}.`);
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const emailIsValid = isValidEmail(emailAddress);

	return (
		<ScreenContainer style={{ justifyContent: 'space-between' }}>
			<TextInput
				label={'Your Email'}
				value={emailAddress}
				disabled={resetPassword.isLoading}
				onChangeText={setEmailAddress}
			/>
			<Button
				mode='contained'
				loading={resetPassword.isLoading}
				disabled={!emailIsValid}
				onPress={onResetPasswordBtnPress}
				style={{ width: '100%' }}
			>
				Next
			</Button>
		</ScreenContainer>
	);
}
