import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface DeleteAccountScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function DeleteAccountScreen({ navigation }: DeleteAccountScreenProps) {
	return (
		<View>
			<Text>DeleteAccountScreen (Content)</Text>
		</View>
	);
}
