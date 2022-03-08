import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TopTabContainer from '../../lib/components/TopTabContainer';
import { Achievement, useClaimedAchievements, useUnClaimAchievement } from '../../data/rewards';
import Empty from '../../lib/components/Empty';
import Loading from '../../lib/components/Loading';
import { chunkArray } from '../../lib/utils/helper';
import { Alert, StyleSheet, View } from 'react-native';
import { Theme } from '../../providers/Theme';
import BadgePot from './components/BadgePot';

interface BadgesTabProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function BadgesTab({ navigation }: BadgesTabProps) {
	const { data: badges, isLoading: badgesIsLoading, isError: badgesIsError } = useClaimedAchievements('me');
	const unClaimAchievement = useUnClaimAchievement();

	if (badgesIsLoading) return <Loading animation='rings' />;

	const chunks: Achievement[][] = chunkArray(badges, 3);

	const onBadgePress = (badge: Achievement) => {
		Alert.alert(badge.title, `Lvl ${badge.level} - ${badge.points} pts\n\n` + badge.description, [
			{
				text: 'Close',
				style: 'cancel',
			},
			{
				text: 'Un-Claim',
				onPress: () => {
					Alert.alert('Un-Claim?', 'This will also remove the points earned from this badge.', [
						{
							text: 'Cancel',
							style: 'cancel',
						},
						{
							text: 'Un-Claim',
							style: 'destructive',
							onPress: () => unClaim(badge),
						},
					]);
				},
			},
		]);
	};

	const unClaim = async (badge: Achievement) => {
		try {
			await unClaimAchievement.mutateAsync(badge);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<TopTabContainer scrolls bounces={false} style={styles.container}>
			{chunks.length === 0 ? (
				<Empty animation='magnifyingGlass' text='No badges to claim.' />
			) : badgesIsError ? (
				<Empty animation='error' text='Error loading badges.' />
			) : (
				chunks.map((chunk, chunkIndex) => (
					<View key={chunkIndex} style={{ ...styles.shelf, ...(chunkIndex === 0 && { paddingTop: 0 }) }}>
						{chunk.map((b, aIndex) => (
							<BadgePot key={String(aIndex + b.id)} badge={b} isLocked={false} onPress={() => onBadgePress(b)} />
						))}
					</View>
				))
			)}
		</TopTabContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		borderLeftWidth: 20,
		borderRightWidth: 20,
		borderColor: Theme.colors.primary,
		paddingHorizontal: 0,
		minHeight: '100%',
	},
	shelf: {
		width: '100%',
		height: 150,
		paddingHorizontal: Theme.spacing.md,
		paddingTop: Theme.spacing.md,
		borderBottomWidth: 10,
		borderColor: Theme.colors.primary,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
	},
});
