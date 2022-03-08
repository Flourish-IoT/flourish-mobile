import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TextInput from '../../lib/components/styled/TextInput';
import { useChangePassword } from '../../data/user';
import { isValidPassword } from '../../lib/utils/validation';
import ScreenContainer from '../../lib/components/ScreenContainer';
import SegmentedList from '../../lib/components/styled/SegmentedList';
import Button from '../../lib/components/styled/Button';
import { StyleSheet } from 'react-native';

interface ChangePasswordScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
	const changePassword = useChangePassword();

	const onChangePasswordPress = async () => {
		try {
			await changePassword.mutateAsync({ password: currentPassword, new_password: newPassword });
			alert('Updated.');
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	const disableUpdateBtn =
		newPassword.trim().length < 4 ||
		currentPassword.trim().length === 0 ||
		newPasswordConfirm.trim().length === 0 ||
		newPassword !== newPasswordConfirm;

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
		<ScreenContainer style={styles.screenContainer}>
			<SegmentedList>
				<TextInput
					label={'Current password'}
					value={currentPassword}
					disabled={changePassword.isLoading}
					onChangeText={setCurrentPassword}
					secureTextEntry
				/>
				<TextInput
					label={getNewPasswordError() ?? 'New password'}
					error={!!getNewPasswordError()}
					value={newPassword}
					disabled={changePassword.isLoading}
					onChangeText={setNewPassword}
					secureTextEntry
				/>
				<TextInput
					label={getNewPasswordConfirmError() ?? 'Confirm new password'}
					error={!!getNewPasswordConfirmError()}
					value={newPasswordConfirm}
					disabled={changePassword.isLoading}
					onChangeText={setNewPasswordConfirm}
					secureTextEntry
				/>
			</SegmentedList>
			<Button
				variant='primary'
				title='Update'
				loading={changePassword.isLoading}
				disabled={disableUpdateBtn}
				onPress={onChangePasswordPress}
			/>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		justifyContent: 'space-between',
	},
});
