import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreenStack from '../screens/welcome/index';
import TestingScreen from '../screens/Testing';
import { NavigatorTheme, GlobalNavigatorOptions } from '../providers/Theme';
import GardenScreenStack from '../screens/garden';
import SettingsScreenStack from '../screens/settings';
import CalendarScreen from '../screens/calendar';
import ForgotPasswordScreen from '../screens/forgotpassword';
import Loading from '../lib/components/Loading';
import { useIsLoggedIn } from '../data/auth';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
			<Stack.Screen name='Welcome' component={WelcomeScreenStack} options={{ headerShown: false }} />
			<Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
		</Stack.Navigator>
	);
};

const HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
			<Stack.Screen name='Garden' component={GardenScreenStack} />
			<Stack.Screen name='Calendar' component={CalendarScreen} options={{ headerShown: false }} />
			<Stack.Screen name='SettingsStack' component={SettingsScreenStack} options={{ headerShown: false }} />
			<Stack.Screen name='Testing' component={TestingScreen} />
		</Stack.Navigator>
	);
};

export default function Navigation() {
	const { data: isLoggedIn, isLoading } = useIsLoggedIn();

	if (isLoading) return <Loading text='Loading app...' />; // TODO: Replace with splash screen

	return (
		<NavigationContainer theme={NavigatorTheme}>
			<Stack.Navigator screenOptions={GlobalNavigatorOptions}>
				{!isLoggedIn ? (
					<Stack.Screen name='AuthStack' component={AuthStack} options={{ headerShown: false }} />
				) : (
					<Stack.Screen name='HomeStack' component={HomeStack} options={{ headerShown: false }} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
