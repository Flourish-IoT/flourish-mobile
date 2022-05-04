import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Calendar from '../lib/icons/Calendar';
import GradCap from '../lib/icons/GradCap';
import Plant from '../lib/icons/Plant';
import Profile from '../lib/icons/Profile';
import Trophy from '../lib/icons/Trophy';
import { Theme } from '../providers/Theme';
import { TouchableOpacity, View, StyleSheet, ViewStyle, Image, Dimensions } from 'react-native';
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
	const focusColor = (focused: boolean) => (focused ? 'white' : Theme.colors.primary);

	switch (icon) {
		case 'Profile':
			return <Profile fill={focusColor(focused)} />;
		case 'Courses':
			return <GradCap fill={focusColor(focused)} />;
		case 'Garden':
			return <Plant fill={focusColor(focused)} width={35} />;
		case 'Calendar':
			return <Calendar fill={focusColor(focused)} />;
		case 'Rewards':
			return <Trophy fill={focusColor(focused)} />;
	}
};

export const appBarCenterBtnSize = 70;
const dimensions = Dimensions.get('window');

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
			borderTopWidth: 0,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			...Theme.shadow,
		},
		appBarBg: {
			position: 'absolute',
			transform: [{ scale: 1 / 3 }],
			bottom: -144,
			left: -1350,
		},
		appBarBtnOuter: {
			flex: 1,
			height: '100%',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
	});

	return (
		<View style={styles.appBar}>
			<Image style={styles.appBarBg} source={require('../lib/assets/appBarBg.png')} />

			{state.routes.map(({ name }, index) => {
				const isFocused = state.index === index;
				const isCenterBtn = name === 'Garden';

				const appBarBtnInner: ViewStyle = {
					...Theme.util.flexCenter,
					width: '75%',
					height: undefined,
					aspectRatio: 1.1 / 1,
					borderRadius: Theme.borderRadius,
					backgroundColor: isFocused ? Theme.colors.primary : 'transparent',
				};

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
						style={isCenterBtn ? { ...styles.appBarBtnOuter, ...centerBtnStyle } : styles.appBarBtnOuter}
					>
						<View style={!isCenterBtn && appBarBtnInner}>
							<ScreenIcon icon={name as AppBarRoute} focused={isFocused} />
						</View>
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
			initialRouteName='Garden'
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
