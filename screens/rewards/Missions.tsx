import React, { useState } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import TopTabContainer from '../../lib/components/layout/TopTabContainer';
import { Mission, useAvailableMissions, useClaimMission } from '../../data/rewards';
import Loading from '../../lib/components/animations/Loading';
import Empty from '../../lib/components/animations/Empty';
import { Theme } from '../../providers/Theme';
import MissionListItem from './components/MissionListItem';
import { useMe } from '../../data/user';
import { Alert } from 'react-native';
import { getRewardsProgress } from '../../lib/utils/helper';
import ClaimedMissionDialog from './components/ClaimedMissionDialog';

interface MissionsTabProps {
	navigation: NavigationProp<ParamListBase>;
}

export default function MissionsTab({ navigation }: MissionsTabProps) {
	const { isLoading: userIsLoading, data: user } = useMe();
	const { isLoading: missionsIsLoading, data: missions, isError: missionsIsError } = useAvailableMissions('me');

	const [claimedMission, setClaimedMission] = useState<Mission | undefined>();
	const claimMission = useClaimMission();

	const onClaim = async (mission: Mission) => {
		const canClaim = !mission.claimed && mission.progress === 100;
		if (!canClaim) return;

		setClaimedMission(mission);

		try {
			const currentLvl = getRewardsProgress(user.xp).level;
			await claimMission.mutateAsync(mission);
			const newLevel = getRewardsProgress(user.xp + mission.points).level;

			if (newLevel > currentLvl) {
				Alert.alert('Level Up', `You are now level ${newLevel}!`);
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<TopTabContainer scrolls>
			{userIsLoading || missionsIsLoading ? (
				<Loading animation='rings' />
			) : missionsIsError ? (
				<Empty animation='error' size='lg' text='Error loading missions.' />
			) : missions.length === 0 ? (
				<Empty animation='magnifyingGlass' size='lg' text='No missions to claim.' />
			) : (
				missions.map((mission, index, { length }) => (
					<MissionListItem
						key={String(index + mission.id)}
						mission={mission}
						containerStyle={{ marginBottom: index !== length - 1 ? Theme.spacing.md : 0 }}
						onClaim={() => onClaim(mission)}
						isLoading={mission.id === claimedMission?.id && claimMission.isLoading}
					/>
				))
			)}

			{!!claimedMission && <ClaimedMissionDialog mission={claimedMission} onClose={() => setClaimedMission(undefined)} />}
		</TopTabContainer>
	);
}
