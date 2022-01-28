import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import TextInput from '../../lib/components/styled/TextInput';
import { useDeleteAccount } from '../../data/user';
import { AppName } from '../../lib/utils/helper';
import { Theme } from '../../providers/Theme';
import ScreenContainer from '../../lib/components/ScreenContainer';

interface DeleteAccountScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {
	const [currentPassword, setCurrentPassword] = useState('');
	const deleteAccount = useDeleteAccount();

	const disableDeleteBtn = currentPassword.trim().length < 4;

	const onChangePasswordPress = () => {
		Alert.alert('Are your sure?', `You are about to delete your ${AppName} account, this cannot be undone.`, [
			{
				text: 'No',
			},
			{
				text: 'Yes',
				onPress: async () => {
					try {
						await deleteAccount.mutateAsync(currentPassword);
						alert('Your account has been successfully deleted.');
					} catch (error) {
						alert(`Error: ${error}`);
					}
				},
			},
		]);
	};

	return (
		<ScreenContainer scrolls={false} style={{ justifyContent: 'space-between' }}>
			<View>
				<TextInput
					label={'Current password'}
					value={currentPassword}
					disabled={deleteAccount.isLoading}
					onChangeText={setCurrentPassword}
					secureTextEntry
				/>
			</View>
			<Button
				mode='contained'
				loading={deleteAccount.isLoading}
				disabled={disableDeleteBtn}
				onPress={onChangePasswordPress}
				color={Theme.colors.error}
			>
				Delete Account
			</Button>
		</ScreenContainer>
	);
}
