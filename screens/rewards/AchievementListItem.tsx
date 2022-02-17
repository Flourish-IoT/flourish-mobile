import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Achievement, useClaimAchievement } from '../../data/rewards';
import StyledButton from '../../lib/components/styled/Button';
import Typography from '../../lib/components/styled/Typography';
import { Theme } from '../../providers/Theme';
import PlantPot from '../garden/components/PlantPot';

interface AchievementListItemProps {
	achievement: Achievement;
}

export default function AchievementListItem({ achievement }: AchievementListItemProps) {
	const { id, title, description, level, points, image, progress, claimed } = achievement;
	const claimAchievement = useClaimAchievement();

	const canClaim = !claimed && progress === 100;

	const onClaimPress = async () => {
		try {
			await claimAchievement.mutateAsync(achievement);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.plantPotContainer}>
				<PlantPot svgProps={{ height: '40%' }} viewMode='Carousel' image={image} />
			</View>
			<View style={styles.content}>
				<Typography variant='heading3Bold'>{title}</Typography>
				<Typography variant='body'>{description}</Typography>
				<ProgressBar style={styles.progressBar} progress={progress / 100} color={Theme.colors.primary} />
				{canClaim && (
					<StyledButton
						variant='primary'
						title='Claim'
						buttonStyle={styles.claimButton}
						onPress={onClaimPress}
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
	content: {
		width: '75%',
		height: '100%',
		padding: Theme.spacing.md,
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
