import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface ExportDataScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ExportDataScreen({ navigation }: ExportDataScreenProps) {
	return (
		<View>
			<Text>ExportDataScreen (Content)</Text>
		</View>
	);
}
