import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { Button, Divider, Text } from 'react-native-paper';
import { Theme, GlobalStackNavOptions } from '../../providers/Theme';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { logOut } from '../../data/auth';
import ChangePasswordScreen from './ChangePassword';
import ChangeUsernameScreen from './ChangeUsername';
import DeleteAccountScreen from './DeleteAccount';
import ExportDataScreen from './ExportData';

interface ProfileScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const ProfileIndex = ({ navigation }: ProfileScreenProps) => {
	return (
		<ScreenContainer style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
			<View style={styles.section}>
				<Text>General</Text>
				<Divider style={styles.divider} />
				<Button onPress={() => navigation.navigate('ChangeUsername')}>Username</Button>
				<Button onPress={() => navigation.navigate('ChangePassword')}>Change Password</Button>
				<Button>FAQ</Button>
				<Text>Data</Text>
				<Divider style={styles.divider} />
				<Button onPress={() => navigation.navigate('ExportData')}>Export Data</Button>
				<Text>Account</Text>
				<Button onPress={logOut}>Log Out</Button>
				<Button onPress={() => navigation.navigate('DeleteAccount')} color={Theme.colors.error}>
					Delete Account
				</Button>
			</View>
		</ScreenContainer>
	);
};

const Stack = createStackNavigator();

export default function ProfileScreenStack() {
	return (
		<Stack.Navigator
			screenOptions={{ ...GlobalStackNavOptions, presentation: 'modal', headerShown: true, headerLeft: null }}
			initialRouteName='ProfileIndex'
		>
			<Stack.Screen name='ProfileIndex' component={ProfileIndex} options={{ headerShown: false }} />
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
