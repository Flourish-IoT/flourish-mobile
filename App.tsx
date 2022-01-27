import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreenStack from './screens/welcome/index';
import TestingScreen from './screens/Testing';
import AppProviders from './providers';
import { NavigatorTheme, GlobalNavigatorOptions } from './providers/Theme';
import GardenScreenStack from './screens/garden';
import SettingsScreenStack from './screens/settings';
import CalendarScreen from './screens/calendar';

const Stack = createStackNavigator();

export default function App() {
	return (
		<AppProviders>
			<NavigationContainer theme={NavigatorTheme}>
				<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
					<Stack.Screen name='Welcome' component={WelcomeScreenStack} options={{ headerShown: false }} />
					<Stack.Screen name='Garden' component={GardenScreenStack} />
					<Stack.Screen name='Testing' component={TestingScreen} />
					<Stack.Screen name='SettingsStack' component={SettingsScreenStack} options={{ headerShown: false }} />
					<Stack.Screen name='Calendar' component={CalendarScreen} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</AppProviders>
	);
}
