import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';

const Stack = createStackNavigator();
const globalScreenOptions = {
	headerStyle: { backgroundColor: '#2C6BED' },
	headerTitleStyle: { color: 'white' },
	headerTintColor: 'white'
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen screenOptions={globalScreenOptions} name='Login' component={LoginScreen} />
				<Stack.Screen screenOptions={globalScreenOptions} name='Register' component={RegisterScreen} />
				<Stack.Screen screenOptions={globalScreenOptions} name='Home' component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
