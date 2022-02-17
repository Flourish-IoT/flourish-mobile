import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMe } from '../../data/user';
import ScreenContainer from '../../lib/components/ScreenContainer';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../providers/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AchievementsTab from './Achievements';
import BadgesTab from './Badges';
import FriendsTab from './Friends';
import Typography from '../../lib/components/styled/Typography';
import Loading from '../../lib/components/Loading';
import { getUserLevelName } from '../../lib/utils/helper';
import StyledAvatar from '../../lib/components/styled/Avatar';

interface RewardsScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const Tab = createMaterialTopTabNavigator();

export const TopTabBar = ({ state, navigation }) => {
	const buttonWidth = 130;
	const tabBarWidth = buttonWidth * state.routes.length;
	const tabBarScrollEnabled = Dimensions.get('window').width > tabBarWidth;

	const styles = StyleSheet.create({
		tabBar: {
			width: tabBarWidth,
			minWidth: '100%',
			flexDirection: 'row',
			backgroundColor: 'white',
			maxHeight: 37.3, // NOTE: This is a fix, tab bar is too tall w/o this
		},
		tabButton: {
			width: buttonWidth,
			justifyContent: 'center',
			alignItems: 'center',
		},
		tabLabel: {
			padding: Theme.spacing.sm,
			opacity: 0.5,
		},
	});

	return (
		<ScrollView horizontal scrollEnabled={tabBarScrollEnabled} style={{ ...styles.tabBar }}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				const activeTabStyle: TextStyle = {
					color: Theme.colors.primary,
					opacity: 1,
				};

				return (
					<TouchableOpacity
						key={route.key}
						onPress={() => navigation.navigate({ name: route.name, merge: true })}
						style={styles.tabButton}
					>
						<Typography variant='heading3Bold' style={{ ...styles.tabLabel, ...(isFocused && activeTabStyle) }}>
							{route.name}
						</Typography>
					</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
};

export default function RewardsScreen({ navigation }: RewardsScreenProps) {
	const insets = useSafeAreaInsets();
	const { data: user, isLoading: userIsLoading } = useMe();

	if (userIsLoading) return <Loading animation='rings' />;

	const styles = StyleSheet.create({
		screenContainer: {
			paddingTop: insets.top,
			paddingHorizontal: 0,
			backgroundColor: 'white',
		},
		topSection: {
			width: '100%',
			alignItems: 'center',
			backgroundColor: 'white',
		},
		avatar: {
			marginBottom: Theme.spacing.md,
		},
		topSectionText: {
			marginBottom: Theme.spacing.md,
		},
		tabNavigator: {
			width: '100%',
		},
		userXpBar: {
			width: '100%',
			borderRadius: 50,
		},
	});

	return (
		<ScreenContainer safePadding={false} style={styles.screenContainer}>
			<View style={styles.topSection}>
				<StyledAvatar user={user} style={styles.avatar} />
				<Typography style={styles.topSectionText} variant='heading3Bold'>
					{user.username}
				</Typography>
				<Typography style={styles.topSectionText} variant='placeholder'>
					{getUserLevelName(user.level)}
				</Typography>
				<Typography style={styles.topSectionText} variant='heading3Bold'>
					{user.xp} pts
				</Typography>
				{/* TODO: Progress bar isn't showing up */}
				{/* <ProgressBar style={styles.userXpBar} progress={user.xp / 500} color={Theme.colors.primary} /> */}
			</View>
			<Tab.Navigator initialRouteName='Achievements' tabBar={TopTabBar} style={styles.tabNavigator}>
				<Tab.Screen name='Achievements' component={AchievementsTab} />
				<Tab.Screen name='Badges' component={BadgesTab} />
				<Tab.Screen name='Friends' component={FriendsTab} />
			</Tab.Navigator>
		</ScreenContainer>
	);
}
