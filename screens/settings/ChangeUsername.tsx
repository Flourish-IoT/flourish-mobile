import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import TextInput from '../../lib/components/styled/TextInput';

interface ChangeDisplayNameScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ChangeUsernameScreen({ navigation }: ChangeDisplayNameScreenProps) {
	const [username, setUsername] = useState('');

	const disableUpdateBtn = username.trim().length > 4;

	return (
		<View style={{ flex: 1, justifyContent: 'space-between' }}>
			<TextInput label='New Username' value={username} onChangeText={setUsername} />
			<Button mode='contained' disabled={disableUpdateBtn}>
				Update
			</Button>
		</View>
	);
}
