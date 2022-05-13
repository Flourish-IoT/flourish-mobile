import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useMe, User } from './user';
import { mockEndpoint, mockAxios } from '../providers/Axios';

export interface Mission {
	id: number;
	title: string;
	description: string;
	level: number;
	points: number;
	image: string | null;
	progress: number; // 0-100 (represents a %)
	claimed: boolean;
}

export const tempMyMissions: Mission[] = [
	{
		id: 1,
		title: 'The Journey Begins',
		image: null,
		description: 'Add your first plant to a collection!',
		level: 1,
		points: 100,
		progress: 100,
		claimed: true,
	},
	{
		id: 2,
		title: 'Monstera Monster',
		image: null,
		description: 'Keep your Monstera alive for at least 30 days',
		level: 1,
		points: 1000,
		progress: 100,
		claimed: false,
	},
	{
		id: 35,
		title: 'Fern-It-Up',
		image: null,
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 250,
		progress: 100,
		claimed: false,
	},
	{
		id: 4,
		title: 'Water, water, water!',
		image: null,
		description: "Don't lose your watering streak for your plants.",
		level: 2,
		points: 800,
		progress: 35,
		claimed: false,
	},
];

export const useMissions = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['missions', 'all', userId],
		async () => {
			const query = `/missions/${userId}`;
			mockEndpoint(200).onGet(query).replyOnce<Mission[]>(200, tempMyMissions);
			const { data: missions } = await mockAxios.get<Mission[]>(query);
			// Sort: First by level (lower first) then by points (lower first)
			const sorted = missions.sort((a, b) => (a.level === b.level ? a.points - b.points : a.level - b.level));
			return sorted;
		},
		{
			enabled: !!user,
		}
	);
};

export const useAvailableMissions = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;
	const { data: missions } = useMissions(userId);

	return useQuery(['missions', 'available', userId], () => missions.filter((a) => !a.claimed), {
		enabled: !!user && !!missions,
	});
};

export const useClaimedMissions = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;
	const { data: missions } = useMissions(userId);

	return useQuery(['missions', 'claimed', userId], () => missions.filter((a) => a.claimed), {
		enabled: !!user && !!missions,
	});
};

export const useClaimMission = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(mission: Mission) => {
			const query = `/missions/${user.id}/claim/${mission.id}`;
			mockEndpoint(200).onPost(query).replyOnce<string>(200, 'OK');
			return mockAxios.post<string>(query);
		},
		{
			onSuccess: (res, mission) => {
				// Remove mission from available missions
				queryClient.setQueryData<Mission[]>(['missions', 'available', user.id], (oldData) => {
					const claimedMission = oldData.find((a) => a.id === mission.id);

					const index = oldData.indexOf(claimedMission);
					oldData.splice(index, 1); // Remove the claimed mission

					return [...oldData];
				});

				// Add mission to claimed badges
				queryClient.setQueryData<Mission[]>(['missions', 'claimed', user.id], (oldData) => [
					...oldData,
					{ ...mission, claimed: true },
				]);

				// Add xp to user
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					xp: oldData.xp + mission.points,
				}));
			},
		}
	);
};

export const useUnClaimMission = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(mission: Mission) => {
			const query = `/missions/${user.id}/unclaim/${mission.id}`;
			mockEndpoint(200).onPost(query).replyOnce<string>(200, 'OK');
			return mockAxios.post<string>(query);
		},
		{
			onSuccess: (res, mission) => {
				// Remove mission from claimed badges
				queryClient.setQueryData<Mission[]>(['missions', 'claimed', user.id], (oldData) => {
					const claimedMission = oldData.find((a) => a.id === mission.id);

					const index = oldData.indexOf(claimedMission);
					oldData.splice(index, 1);

					return [...oldData];
				});

				// Add mission to available missions
				queryClient.setQueryData<Mission[]>(['missions', 'available', user.id], (oldData) => [
					...oldData,
					{ ...mission, claimed: false },
				]);

				// Remove xp from user
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					xp: oldData.xp - mission.points,
				}));
			},
		}
	);
};
