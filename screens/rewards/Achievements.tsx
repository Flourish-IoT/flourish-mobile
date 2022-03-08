import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TopTabContainer from '../../lib/components/TopTabContainer';
import { useAvailableAchievements } from '../../data/rewards';
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
	const { isLoading: achievementsIsLoading, data: achievements, isError: achievementsIsError } = useAvailableAchievements('me');

	return (
		<TopTabContainer scrolls>
			{achievementsIsLoading ? (
				<Loading animation='rings' />
			) : achievementsIsError ? (
				<Empty animation='error' size='lg' text='Error loading achievements.' />
			) : achievements.length === 0 ? (
				<Empty animation='magnifyingGlass' size='lg' text='No achievements to claim.' />
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
