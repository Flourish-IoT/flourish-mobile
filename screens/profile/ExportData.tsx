import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { useExportData, useUser } from '../../data/user';

interface ExportDataScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function ExportDataScreen({ navigation }: ExportDataScreenProps) {
	const { data: user, isLoading: userIsLoading } = useUser('me');
	const [dataSent, setDataSent] = useState(false);

	const exportData = useExportData();

	const onExportDataBtnPress = async () => {
		try {
			await exportData.mutateAsync();
			setDataSent(true);
			alert(
				`We have sent your data to ${user.email} please wait a few minutes and be sure to check your spam or junk folders.`
			);
		} catch (error) {
			alert(`Error: ${error}`);
		}
	};

	return (
		<ScreenContainer style={{ justifyContent: 'space-between' }}>
			<Text>This will send a spreadsheet of all of your user data.</Text>
			<Button
				mode='contained'
				loading={exportData.isLoading}
				disabled={userIsLoading || dataSent}
				onPress={onExportDataBtnPress}
				style={{ width: '100%' }}
			>
				Send
			</Button>
		</ScreenContainer>
	);
}
