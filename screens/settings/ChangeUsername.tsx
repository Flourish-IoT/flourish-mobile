import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import TextInput from '../../lib/components/styled/TextInput';
import { useChangeUsername } from '../../data/user';
import ScreenContainer from '../../lib/components/ScreenContainer';

interface ChangeDisplayNameScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ChangeUsernameScreen({ navigation }: ChangeDisplayNameScreenProps) {
	const [newUsername, setNewUsername] = useState('');
	const changeUsername = useChangeUsername();

	const onChangePasswordPress = async () => {
		try {
			await changeUsername.mutateAsync(newUsername);
			alert('Updated.');
		} catch (error) {
			alert(`Failed to update username: ${error}`);
		}
	};

	const disableUpdateBtn = newUsername.trim().length < 4 || changeUsername.isLoading;
	const getNewUsernameError = () => {
		if (newUsername.trim().length === 0) return undefined;
		if (newUsername.trim().length < 4) {
			return 'Username must be at least 4 characters';
		}
		return undefined;
	};

	return (
		<ScreenContainer style={{ justifyContent: 'space-between' }}>
			<TextInput
				label={getNewUsernameError() ?? 'New Username'}
				error={!!getNewUsernameError()}
				value={newUsername}
				disabled={changeUsername.isLoading}
				onChangeText={setNewUsername}
			/>
			<Button
				mode='contained'
				loading={changeUsername.isLoading}
				disabled={disableUpdateBtn}
				onPress={onChangePasswordPress}
				style={{ width: '100%' }}
			>
				Update
			</Button>
		</ScreenContainer>
	);
}
