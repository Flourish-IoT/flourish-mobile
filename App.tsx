import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreenStack from './screens/welcome/index';
import TestingScreen from './screens/Testing';
import AppProviders from './providers';
import { NavigatorTheme, GlobalNavigatorOptions } from './providers/Theme';

const Stack = createStackNavigator();

export default function App() {
	return (
		<AppProviders>
			<NavigationContainer theme={NavigatorTheme}>
				<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
					<Stack.Screen name='Welcome' component={WelcomeScreenStack} options={{ headerShown: false }} />
					<Stack.Screen name='Testing' component={TestingScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppProviders>
	);
}
