import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TopTabContainer from '../../lib/components/layout/TopTabContainer';
import { Mission, useClaimedMissions, useUnClaimMission } from '../../data/rewards';
import Empty from '../../lib/components/animations/Empty';
import Loading from '../../lib/components/animations/Loading';
import { chunkArray } from '../../lib/utils/helper';
import { Alert, StyleSheet, View } from 'react-native';
import { Theme } from '../../providers/Theme';
import PlantPot from '../garden/components/PlantPot';

interface BadgesTabProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function BadgesTab({ navigation }: BadgesTabProps) {
	const { data: badges, isLoading: badgesIsLoading, isError: badgesIsError } = useClaimedMissions('me');
	const unClaimMission = useUnClaimMission();

	if (badgesIsLoading) return <Loading animation='rings' />;

	const chunks: Mission[][] = chunkArray(badges, 3);

	const onBadgePress = (badge: Mission) => {
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

	const unClaim = async (badge: Mission) => {
		try {
			await unClaimMission.mutateAsync(badge);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<TopTabContainer scrolls bounces={false} style={styles.container}>
			{chunks.length === 0 ? (
				<Empty animation='magnifyingGlass' size='lg' text='No badges to claim.' />
			) : badgesIsError ? (
				<Empty animation='error' text='Error loading badges.' />
			) : (
				chunks.map((chunk, chunkIndex) => (
					<View key={chunkIndex} style={{ ...styles.shelf, ...(chunkIndex === 0 && { paddingTop: 0 }) }}>
						{chunk.map((b, aIndex) => (
							<PlantPot
								key={String(aIndex + b.id)}
								image={b.image}
								onPress={() => onBadgePress(b)}
								containerStyle={styles.badge}
							/>
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
		borderColor: Theme.colors.primary,
		borderBottomWidth: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
	},
	badge: {
		width: '25%',
		transform: [{ translateY: 230 / 4 - 4 }], // FIX: -4 for gap between pot and shelf
	},
});
