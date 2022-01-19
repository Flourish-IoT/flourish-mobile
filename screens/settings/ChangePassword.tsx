import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface ChangePasswordScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ChangePasswordScreen({ navigation }: ChangePasswordScreenProps) {
	return (
		<View>
			<Text>ChangePasswordScreen (Content)</Text>
		</View>
	);
}
