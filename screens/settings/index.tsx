import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { GlobalNavigatorOptions } from '../../providers/Theme';
import ChangeUsernameScreen from './ChangeUsername';
import ChangePasswordScreen from './ChangePassword';
import DeleteAccountScreen from './DeleteAccount';
import ExportDataScreen from './ExportData';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { useLogOut } from '../../data/auth';

interface SettingsScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const Stack = createStackNavigator();

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
	const logOut = useLogOut();

	return (
		<ScreenContainer scrolls={false} style={{ justifyContent: 'space-between' }}>
			<View style={styles.section}>
				<Text>Account</Text>
				<Divider style={styles.divider} />
				<Button onPress={() => navigation.navigate('ChangeUsername')}>Username</Button>
				<Button onPress={() => navigation.navigate('ChangePassword')}>Change Password</Button>
				<Text>Data</Text>
				<Divider style={styles.divider} />
				<Button onPress={() => navigation.navigate('ExportData')}>Export Data</Button>
			</View>
			<View style={styles.section}>
				<Button onPress={logOut.mutate}>Log Out</Button>
				<Button onPress={() => navigation.navigate('DeleteAccount')}>Delete Account</Button>
			</View>
		</ScreenContainer>
	);
};

export default function SettingsScreenStack() {
	return (
		<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
			<Stack.Screen name='Settings' component={SettingsScreen} />
			<Stack.Screen name='ChangeUsername' options={{ title: 'Change Username' }} component={ChangeUsernameScreen} />
			<Stack.Screen name='ChangePassword' options={{ title: 'Change Password' }} component={ChangePasswordScreen} />
			<Stack.Screen name='ExportData' options={{ title: 'Export Data' }} component={ExportDataScreen} />
			<Stack.Screen name='DeleteAccount' options={{ title: 'Delete Account' }} component={DeleteAccountScreen} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	section: {
		display: 'flex',
		alignItems: 'flex-start',
	},
	divider: {
		width: '100%',
		height: 3,
	},
});
