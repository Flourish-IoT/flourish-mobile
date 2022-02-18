import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Achievement, useClaimAchievement } from '../../data/rewards';
import { useMe } from '../../data/user';
import { EvilIcons } from '@expo/vector-icons';
import Loading from '../../lib/components/Loading';
import StyledButton from '../../lib/components/styled/Button';
import Typography from '../../lib/components/styled/Typography';
import { getUserLevel } from '../../lib/utils/helper';
import { Theme } from '../../providers/Theme';
import BadgePot from './components/BadgePot';

interface AchievementListItemProps {
	achievement: Achievement;
}

export default function AchievementListItem({ achievement }: AchievementListItemProps) {
	const { id, title, description, level, points, image, progress, claimed } = achievement;
	const { data: user, isLoading: userIsLoading } = useMe();
	const claimAchievement = useClaimAchievement();

	const canClaim = !claimed && progress === 100;

	const onClaimPress = async () => {
		try {
			const currentLvl = getUserLevel(user.xp);
			await claimAchievement.mutateAsync(achievement);
			const newLevel = getUserLevel(user.xp + achievement.points);
			if (newLevel > currentLvl) {
				Alert.alert('Level Up', `You are now level ${newLevel}!`);
			}
		} catch (error) {
			alert(error);
		}
	};

	if (userIsLoading) return <Loading animation='rings' />;

	const isLocked = getUserLevel(user.xp) < achievement.level;

	return (
		<View style={styles.container}>
			<View style={styles.plantPotContainer}>
				<BadgePot
					badge={achievement}
					showLevel
					isLocked={isLocked}
					containerStyle={styles.badge}
					imageStyle={{ width: '90%' }}
				/>
			</View>
			<View style={styles.content}>
				<Typography variant='heading3Bold'>
					{title} <Typography variant='placeholder'>{points} pts</Typography>
				</Typography>
				<Typography variant='body'>{description}</Typography>
				<ProgressBar style={styles.progressBar} progress={progress / 100} color={Theme.colors.primary} />
				{canClaim && (
					<StyledButton
						variant='primary'
						title='Claim'
						buttonStyle={styles.claimButton}
						onPress={onClaimPress}
						disabled={isLocked}
						icon={isLocked && <EvilIcons name='lock' style={{ color: 'white', fontSize: 30 }} />}
						loading={claimAchievement.isLoading}
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		height: 150,
	},
	plantPotContainer: {
		...Theme.util.flexCenter,
		width: '25%',
		height: '100%',
	},
	badge: {
		width: '100%',
		justifyContent: 'center',
	},
	content: {
		width: '75%',
		height: '100%',
		padding: Theme.spacing.md,
		paddingLeft: Theme.spacing.md * 2,
		justifyContent: 'space-between',
	},
	progressBar: {
		borderRadius: 50,
	},
	claimButton: {
		height: 30,
		borderRadius: Theme.borderRadius,
	},
});
