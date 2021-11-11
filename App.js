import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppBar from './lib/components/AppBar';
import Theme from './lib/theme';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import TestingScreen from './screens/Testing';

axios.defaults.baseURL = 'https://f8rxwugjzj.execute-api.us-east-1.amazonaws.com/default';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use((res) => { // Status codes 100-399
	// Do something with response data
	return res;
}, (error) => { // Status codes 400-599
	alert(`Woops.. ${error.response.status}: ${error.response.data}`);
	return Promise.reject(error);
});

const Stack = createStackNavigator();
const globalScreenOptions = {
	headerStyle: { backgroundColor: Theme.colors.primary },
	headerTitleStyle: { color: 'white' },
	headerTintColor: 'white'
};

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions}>
				<Stack.Screen name='Login' component={LoginScreen} />
				<Stack.Screen name='Register' component={RegisterScreen} />
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='Testing' component={TestingScreen} />
			</Stack.Navigator>
			<AppBar />
		</NavigationContainer>
	);
}
