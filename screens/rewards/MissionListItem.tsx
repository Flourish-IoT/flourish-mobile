import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Mission } from '../../data/rewards';
import { useMe } from '../../data/user';
import { EvilIcons } from '@expo/vector-icons';
import Loading from '../../lib/components/Loading';
import StyledButton from '../../lib/components/styled/Button';
import Typography from '../../lib/components/styled/Typography';
import { getRewardsProgress } from '../../lib/utils/helper';
import { Theme } from '../../providers/Theme';
import BadgePot from './components/BadgePot';
import { StyledProgressBar } from '../../lib/components/styled/ProgressBar';
import StyledDivider from '../../lib/components/styled/Divider';

interface MissionListItemProps {
	mission: Mission;
	onClaim: () => void;
	isLoading: boolean;
	containerStyle?: ViewStyle;
}

export default function MissionListItem({ mission, onClaim, isLoading, containerStyle }: MissionListItemProps) {
	const { data: user, isLoading: userIsLoading } = useMe();

	if (userIsLoading) return <Loading animation='rings' />;

	const { id, title, description, level, points, image, progress, claimed } = mission;
	const canClaim = !mission.claimed && mission.progress === 100;
	const isLocked = getRewardsProgress(user.xp).level < mission.level;

	return (
		<View style={{ ...styles.container, ...containerStyle }}>
			{/* TOP */}
			<View style={styles.topSection}>
				{/* LEFT */}
				<View style={styles.topLeftContainer}>
					<BadgePot badge={mission} showLevel containerStyle={styles.badge} imageStyle={{ width: '100%' }} />
				</View>
				{/* RIGHT */}
				<View style={styles.topRightContainer}>
					<Typography variant='h3bold'>{title}</Typography>
					<Typography variant='placeholder'>{points} pts</Typography>
					<Typography variant='body'>{description}</Typography>
					<StyledProgressBar value={progress} containerStyle={styles.progressBar} />
				</View>
			</View>
			<StyledDivider style={styles.divider} />
			{/* BOTTOM */}
			<View style={styles.bottomSection}>
				{/* LEFT */}
				<Typography variant='body'>{progress}% complete</Typography>
				{/* RIGHT */}
				<StyledButton
					variant='primary'
					title='Claim'
					buttonStyle={styles.claimButton}
					onPress={onClaim}
					disabled={!canClaim || isLocked}
					icon={isLocked && <EvilIcons name='lock' style={{ color: 'white', fontSize: 30 }} />}
					loading={isLoading}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 225,
		backgroundColor: 'white',
		padding: Theme.spacing.md,
		borderRadius: Theme.borderRadius,
		justifyContent: 'space-between',
	},
	topSection: {
		flexDirection: 'row',
		width: '100%',
		flex: 1,
	},
	topLeftContainer: {
		...Theme.util.flexCenter,
		width: '30%',
		height: '100%',
	},
	badge: {
		width: '100%',
		justifyContent: 'center',
	},
	topRightContainer: {
		paddingVertical: 20,
		paddingLeft: Theme.spacing.lg,
		width: '70%',
		height: '100%',
		justifyContent: 'space-between',
	},
	progressBar: {},
	divider: {
		marginVertical: Theme.spacing.sm,
	},
	bottomSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: 30,
	},
	claimButton: {
		width: 125,
		height: 25,
		borderRadius: Theme.borderRadius,
	},
});
