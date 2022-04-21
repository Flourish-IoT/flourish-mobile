import { StyledProgressBar } from '../../lib/components/styled/ProgressBar';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useMe } from '../../data/user';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../providers/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MissionsTab from './Missions';
import BadgesTab from './Badges';
import Typography from '../../lib/components/styled/Typography';
import Loading from '../../lib/components/Loading';
import { getRewardsProgress, getUserLevelName } from '../../lib/utils/helper';
import StyledAvatar from '../../lib/components/styled/Avatar';

interface RewardsScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

const Tab = createMaterialTopTabNavigator();

export const TopTabBar = ({ state, navigation }) => {
	const styles = StyleSheet.create({
		tabBar: {
			width: '100%',
			flexDirection: 'row',
		},
		tabButton: {
			...Theme.util.flexCenter,
			width: '50%',
			padding: Theme.spacing.sm,
		},
		tabLabel: {
			opacity: 0.5,
		},
	});

	return (
		<View style={styles.tabBar}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				const activeTabStyle: TextStyle = {
					color: Theme.colors.primary,
					opacity: 1,
				};

				return (
					<TouchableOpacity
						key={String(index + route.key)}
						onPress={() => navigation.navigate({ name: route.name, merge: true })}
						style={styles.tabButton}
					>
						<Typography variant='h3bold' style={{ ...styles.tabLabel, ...(isFocused && activeTabStyle) }}>
							{route.name}
						</Typography>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default function RewardsScreen({ navigation }: RewardsScreenProps) {
	const insets = useSafeAreaInsets();
	const { data: user, isLoading: userIsLoading } = useMe();

	if (userIsLoading) return <Loading animation='rings' />;

	const userLevel = getRewardsProgress(user.xp).level;

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
			padding: Theme.spacing.screenContainer,
			paddingBottom: 0,
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
		progressBar: {
			marginBottom: Theme.spacing.md,
		},
	});

	return (
		<ScreenContainer safePadding={false} style={styles.screenContainer}>
			<View style={styles.topSection}>
				<StyledAvatar user={user} style={styles.avatar} />
				<Typography style={styles.topSectionText} variant='h3bold'>
					{user.username}
				</Typography>
				<Typography style={styles.topSectionText} variant='placeholder'>
					Lvl {userLevel} - {getUserLevelName(userLevel)}
				</Typography>
				<Typography style={styles.topSectionText} variant='h3bold'>
					{getRewardsProgress(user.xp).percent} pts
				</Typography>
				<StyledProgressBar value={getRewardsProgress(user.xp).percent} containerStyle={styles.progressBar} />
			</View>
			<Tab.Navigator initialRouteName='Missions' tabBar={TopTabBar} style={styles.tabNavigator}>
				<Tab.Screen name='Missions' component={MissionsTab} />
				<Tab.Screen name='Badges' component={BadgesTab} />
			</Tab.Navigator>
		</ScreenContainer>
	);
}
