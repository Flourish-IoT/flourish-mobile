import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Alert } from 'react-native';
import TextInput from '../../lib/components/styled/TextInput';
import { useDeleteAccount } from '../../data/user';
import { AppName } from '../../lib/utils/helper';
import { Theme } from '../../providers/Theme';
import ScreenContainer from '../../lib/components/ScreenContainer';
import SegmentedList from '../../lib/components/styled/SegmentedList';
import Button from '../../lib/components/styled/Button';

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
		<ScreenContainer style={{ justifyContent: 'space-between' }}>
			<SegmentedList>
				<TextInput
					label={'Current password'}
					value={currentPassword}
					disabled={deleteAccount.isLoading}
					onChangeText={setCurrentPassword}
					secureTextEntry
				/>
			</SegmentedList>
			<Button
				variant='primary'
				onPress={onChangePasswordPress}
				title='Delete Account'
				disabled={disableDeleteBtn}
				loading={deleteAccount.isLoading}
				buttonStyle={{ backgroundColor: Theme.colors.error }}
			/>
		</ScreenContainer>
	);
}
