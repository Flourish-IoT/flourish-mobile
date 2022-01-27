import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../lib/components/ScreenContainer';

interface ExportDataScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ExportDataScreen({ navigation }: ExportDataScreenProps) {
	return (
		<ScreenContainer style={{ justifyContent: 'space-between' }}>
			<Text>Export Data Screen (Content)</Text>
		</ScreenContainer>
	);
}
