import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TopTabContainer from '../../lib/components/TopTabContainer';
import { useAchievements } from '../../data/rewards';
import Loading from '../../lib/components/Loading';
import Empty from '../../lib/components/Empty';
import { StyleSheet, View } from 'react-native';
import { Theme } from '../../providers/Theme';
import AchievementListItem from './AchievementListItem';
import StyledDivider from '../../lib/components/styled/Divider';

interface AchievementsTabProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function AchievementsTab({ navigation }: AchievementsTabProps) {
	const { isLoading: achievementsIsLoading, data: achievements, isError } = useAchievements('me');

	return (
		<TopTabContainer scrolls>
			{achievementsIsLoading ? (
				<Loading animation='rings' />
			) : achievements.length === 0 ? (
				<Empty animation='magnifyingGlass' text='No achievements found.' />
			) : isError ? (
				<Empty animation='error' text='Error loading achievements.' />
			) : (
				<View style={styles.list}>
					{achievements.map((a, index, { length }) => (
						<View key={a.id}>
							<AchievementListItem achievement={a} />
							{index !== length - 1 && <StyledDivider style={styles.divider} />}
						</View>
					))}
				</View>
			)}
		</TopTabContainer>
	);
}

const styles = StyleSheet.create({
	list: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: Theme.borderRadius,
		padding: Theme.spacing.md,
	},
	divider: {
		marginVertical: Theme.spacing.md,
	},
});
