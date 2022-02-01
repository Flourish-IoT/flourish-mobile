import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { Button } from 'react-native-paper';
import { GlobalStackNavOptions } from '../../providers/Theme';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreenStack from '../settings';

interface ProfileScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
	return (
		<ScreenContainer scrolls>
			<Button onPress={() => navigation.navigate('SettingsStack')}>Settings</Button>
		</ScreenContainer>
	);
};

const Stack = createStackNavigator();

export default function ProfileScreenStack() {
	return (
		<Stack.Navigator screenOptions={{ ...GlobalStackNavOptions, presentation: 'modal' }} initialRouteName='ProfileIndex'>
			<Stack.Screen name='ProfileIndex' component={ProfileScreen} />
			<Stack.Screen name='SettingsStack' component={SettingsScreenStack} options={{ title: 'Settings' }} />
		</Stack.Navigator>
	);
}
