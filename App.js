import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';

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
