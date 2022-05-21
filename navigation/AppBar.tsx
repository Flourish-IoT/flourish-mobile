import React, { useRef } from 'react';
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

const dimensions = Dimensions.get('window');
const centerBtnSize = 70;
const appBarBgCurveWidth = 106;

function OurTabBar({ state, navigation }: BottomTabBarProps) {
	const imageRef = useRef<Image>();
	const insets = useSafeAreaInsets();

	const styles = StyleSheet.create({
		appBarBtnContainer: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: Theme.appBarHeight,
			paddingHorizontal: Theme.spacing.lg,
			paddingBottom: insets.bottom / 2,
			borderTopWidth: 0,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		appBarBtn: {
			width: 50,
			height: 45,
			borderRadius: Theme.borderRadius,
			...Theme.util.flexCenter,
		},
		centerBtn: {
			borderRadius: centerBtnSize / 2,
			width: centerBtnSize,
			height: centerBtnSize,
			transform: [{ translateY: -(Theme.appBarHeight / 3) - 5 }, { translateX: 1.5 }],
			...Theme.util.flexCenter,
			...Theme.shadow,
		},
		appBarBgContainer: {
			position: 'absolute',
			width: dimensions.width,
			height: Theme.appBarHeight,
			bottom: 0,
			left: 0,
			flexDirection: 'row',
			...Theme.shadow,
		},
		appBarBgSides: {
			backgroundColor: 'white',
			height: '100%',
			flex: 1,
		},
		appBarBgDip: {
			width: appBarBgCurveWidth,
			height: '100%',
		},
	});

	return (
		<>
			<View style={styles.appBarBgContainer}>
				<View style={styles.appBarBgSides} />
				<Image ref={imageRef} style={styles.appBarBgDip} source={require('../lib/assets/appBarBgCurve.png')} />
				<View style={styles.appBarBgSides} />
			</View>
			<View style={styles.appBarBtnContainer}>
				{state.routes.map(({ name }, index) => {
					const isFocused = state.index === index;
					const isCenterBtn = name === 'Garden';

					const appBarBtnStyle: ViewStyle = {
						backgroundColor: isFocused ? Theme.colors.primary : 'transparent',
						...styles.appBarBtn,
					};

					const centerBtnStyle: ViewStyle = {
						backgroundColor: isFocused ? Theme.colors.primary : 'white',
						...styles.centerBtn,
					};

					return (
						<TouchableOpacity
							activeOpacity={1}
							key={index + name}
							onPress={() => navigation.navigate(name)}
							style={isCenterBtn ? centerBtnStyle : appBarBtnStyle}
						>
							<ScreenIcon icon={name as AppBarRoute} focused={isFocused} />
						</TouchableOpacity>
					);
				})}
			</View>
		</>
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
