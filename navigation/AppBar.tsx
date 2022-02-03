import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Calendar from '../lib/icons/Calendar';
import GradCap from '../lib/icons/GradCap';
import Plant from '../lib/icons/Plant';
import Profile from '../lib/icons/Profile';
import Trophy from '../lib/icons/Trophy';
import { Theme } from '../providers/Theme';
import CalendarScreen from '../screens/calendar';
import GardenScreenStack from '../screens/garden';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import ProfileScreenStack from '../screens/profile';

const Tab = createBottomTabNavigator();

type AppBarRoute = 'Profile' | 'Courses' | 'Garden' | 'Calendar' | 'Social';

interface ScreenIconProps extends SvgProps {
	icon: AppBarRoute;
	focused: boolean;
}

const ScreenIcon = ({ icon, focused }: ScreenIconProps) => {
	const focusColor = (focused: boolean) => (focused ? Theme.colors.primary : Theme.colors.disabled);

	switch (icon) {
		case 'Profile':
			return <Profile fill={focusColor(focused)} />;
		case 'Courses':
			return <GradCap fill={focusColor(focused)} />;
		case 'Garden':
			return <Plant fill={focusColor(focused)} />;
		case 'Calendar':
			return <Calendar fill={focusColor(focused)} />;
		case 'Social':
			return <Trophy fill={focusColor(focused)} />;
	}
};

function OurTabBar({ state, navigation }: BottomTabBarProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		appBar: {
			position: 'absolute',
			bottom: insets.bottom,
			left: insets.left + Theme.padding,
			right: insets.right + Theme.padding,
			backgroundColor: 'white',
			height: Theme.appBarHeight,
			paddingBottom: 0,
			borderTopWidth: 0,
			borderRadius: 15,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 0.25 },
			shadowOpacity: 0.25,
			shadowRadius: 2,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		appBarButton: {
			flex: 1,
			height: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
	});

	return (
		<View style={styles.appBar}>
			{state.routes.map(({ name }, index) => {
				const isFocused = state.index === index;

				return (
					<TouchableOpacity
						key={name}
						onPress={() => {
							navigation.navigate(name);
						}}
						style={styles.appBarButton}
					>
						<ScreenIcon icon={name as AppBarRoute} focused={isFocused} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

function SocialScreenStack() {
	return null;
}

function CoursesScreenStack() {
	return null;
}

export default function AppBarStack() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='Garden'
			tabBar={(props) => <OurTabBar {...props} />}
		>
			<Tab.Screen name='Profile' component={ProfileScreenStack} />
			<Tab.Screen name='Courses' component={CoursesScreenStack} />
			<Tab.Screen name='Garden' component={GardenScreenStack} />
			<Tab.Screen name='Calendar' component={CalendarScreen} />
			<Tab.Screen name='Social' component={SocialScreenStack} />
		</Tab.Navigator>
	);
}