import React from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from './lib/theme';
import WelcomeScreenStack from './screens/welcome/index';
import TestingScreen from './screens/Testing';
import { ToastProvider } from 'react-native-toast-notifications';
import { ApiUrl } from './data/api';

axios.defaults.baseURL = ApiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// TODO: staleTime doesn't seem to be working
			staleTime: 1000 * 60 * 2, // Default cache time in ms
		},
	},
});

const Stack = createStackNavigator();

const globalScreenOptions = {
	headerStyle: { backgroundColor: Theme.colors.primary },
	headerTitleStyle: { color: 'white' },
	headerTintColor: 'white',
};

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
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
			</ToastProvider>
		</QueryClientProvider>
	);
}
