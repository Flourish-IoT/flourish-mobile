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

interface SettingsScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const Stack = createStackNavigator();

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
	return (
		<View style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
			<View>
				<Text>Account</Text>
				<Divider style={{ height: 3 }} />
				<Button onPress={() => navigation.navigate('ChangeUsername')}>Username</Button>
				<Button onPress={() => navigation.navigate('ChangePassword')}>Change Password</Button>
				<Text>Data</Text>
				<Divider style={{ height: 3 }} />
				<Button onPress={() => navigation.navigate('ExportData')}>Export Data</Button>
			</View>
			<View>
				<Button onPress={() => {}}>Log Out</Button>
				<Button onPress={() => navigation.navigate('DeleteAccount')}>Delete Account</Button>
			</View>
		</View>
	);
};

export default function SettingsScreenStack() {
	return (
		<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
			<Stack.Screen name='Settings' component={SettingsScreen} />
			<Stack.Screen name='ChangeUsername' options={{ title: 'Change Username' }} component={ChangeUsernameScreen} />
			<Stack.Screen name='ChangePassword' options={{ title: 'Change Password' }} component={ChangePasswordScreen} />
			<Stack.Screen name='DeleteAccount' options={{ title: 'Delete Account' }} component={DeleteAccountScreen} />
			<Stack.Screen name='ExportData' options={{ title: 'Export Data' }} component={ExportDataScreen} />
		</Stack.Navigator>
	);
}
