import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Calendar from '../lib/icons/Calendar';
import GradCap from '../lib/icons/GradCap';
import Plant from '../lib/icons/Plant';
import Profile from '../lib/icons/Profile';
import Trophy from '../lib/icons/Trophy';
import { Theme } from '../providers/Theme';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import ProfileScreenStack from '../screens/profile';
import GardenScreenStack from '../screens/garden';
import CalendarScreen from '../screens/calendar';
import RewardsScreen from '../screens/rewards';
import EducationScreenStack from '../screens/education';

const Tab = createBottomTabNavigator();

type AppBarRoute = 'Profile' | 'Courses' | 'Garden' | 'Calendar' | 'Rewards';

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
			return <Plant fill={focused ? 'white' : Theme.colors.text} width={35} />;
		case 'Calendar':
			return <Calendar fill={focusColor(focused)} />;
		case 'Rewards':
			return <Trophy fill={focusColor(focused)} />;
	}
};

export const appBarCenterBtnSize = 70;

function OurTabBar({ state, navigation }: BottomTabBarProps) {
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		appBar: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: Theme.appBarHeight + insets.bottom,
			paddingHorizontal: Theme.spacing.md,
			paddingBottom: insets.bottom,
			backgroundColor: 'white',
			borderTopWidth: 0,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			...Theme.shadow,
		},
		appBarButton: {
			flex: 1,
			height: '100%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
	});

	return (
		<View style={styles.appBar}>
			{state.routes.map(({ name }, index) => {
				const isFocused = state.index === index;
				const isCenterBtn = name === 'Garden';

				const centerBtnStyle: ViewStyle = {
					borderRadius: 100,
					width: appBarCenterBtnSize,
					height: appBarCenterBtnSize,
					transform: [{ translateY: -Theme.appBarHeight / 2 }],
					backgroundColor: isFocused ? Theme.colors.primary : 'white',
					...Theme.shadow,
				};

				return (
					<TouchableOpacity
						activeOpacity={1}
						key={index + name}
						onPress={() => navigation.navigate(name)}
						style={isCenterBtn ? { ...styles.appBarButton, ...centerBtnStyle } : styles.appBarButton}
					>
						<ScreenIcon icon={name as AppBarRoute} focused={isFocused} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default function AppBarStack() {
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			// TODO: Put this back, do not commit! initialRouteName='Garden'
			initialRouteName='Courses'
			tabBar={(props) => <OurTabBar {...props} />}
		>
			<Tab.Screen name='Profile' component={ProfileScreenStack} />
			<Tab.Screen name='Courses' component={EducationScreenStack} />
			<Tab.Screen name='Garden' component={GardenScreenStack} />
			<Tab.Screen name='Calendar' component={CalendarScreen} />
			<Tab.Screen name='Rewards' component={RewardsScreen} />
		</Tab.Navigator>
	);
}
