import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from './lib/theme';
import WelcomeScreenStack from './screens/welcome/index';
import TestingScreen from './screens/Testing';
import AppProviders from './providers';

const globalScreenOptions = {
	headerStyle: { backgroundColor: Theme.colors.primary },
	headerTitleStyle: { color: 'white' },
};

const Stack = createStackNavigator();

export default function App() {
	return (
		<AppProviders>
			<NavigationContainer
				theme={{
					// @ts-ignore
					colors: { background: 'white' },
				}}
			>
				<Stack.Navigator screenOptions={globalScreenOptions}>
					<Stack.Screen name='Welcome' component={WelcomeScreenStack} options={{ headerShown: false }} />
					<Stack.Screen name='Testing' component={TestingScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppProviders>
	);
}
