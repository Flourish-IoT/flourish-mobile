import { useMutation, useQuery, useQueryClient } from 'react-query';
import { mockEndpoint, useAxios } from './api';
import { useMe, User } from './user';

export interface Mission {
	id: number;
	title: string;
	description: string;
	level: number;
	points: number;
	image: MissionImageName | null;
	progress: number; // 0-100 (represents a %)
	claimed: boolean;
}

export type MissionImageName = 'fern-it-up' | 'monstera-monster' | 'the-journey-begins' | 'water-water-water';

export const tempMyMissions: Mission[] = [
	{
		id: 1,
		title: 'The Journey Begins',
		image: 'the-journey-begins',
		description: 'Add your first plant to a collection!',
		level: 1,
		points: 100,
		progress: 100,
		claimed: true,
	},
	{
		id: 2,
		title: 'Monstera Monster',
		image: 'monstera-monster',
		description: 'Keep your Monstera alive for at least 30 days',
		level: 1,
		points: 1000,
		progress: 100,
		claimed: false,
	},
	{
		id: 3,
		title: 'Fern-It-Up',
		image: 'fern-it-up',
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 250,
		progress: 100,
		claimed: false,
	},
	{
		id: 4,
		title: 'Water, water, water!',
		image: 'water-water-water',
		description: "Don't lose your watering streak for your plants.",
		level: 2,
		points: 800,
		progress: 35,
		claimed: false,
	},
];

export const useMissions = (userId: number | 'me') => {
	const axios = useAxios();
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.userId;

	return useQuery(
		['missions', 'all', userId],
		async () => {
			const query = `/missions/${userId}`;
			mockEndpoint(200).onGet(query).replyOnce<Mission[]>(200, tempMyMissions);
			const { data: missions } = await axios.get<Mission[]>(query);
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
	if (userId === 'me') userId = user?.userId;
	const { data: missions } = useMissions(userId);

	return useQuery(['missions', 'available', userId], () => missions.filter((a) => !a.claimed), {
		enabled: !!user && !!missions,
	});
};

export const useClaimedMissions = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.userId;
	const { data: missions } = useMissions(userId);

	return useQuery(['missions', 'claimed', userId], () => missions.filter((a) => a.claimed), {
		enabled: !!user && !!missions,
	});
};

export const useClaimMission = () => {
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(mission: Mission) => {
			const query = `/missions/${user.userId}/claim/${mission.id}`;
			mockEndpoint(200).onPost(query).replyOnce<string>(200, 'OK');
			return axios.post<string>(query);
		},
		{
			onSuccess: (res, mission) => {
				// Remove mission from available missions
				queryClient.setQueryData<Mission[]>(['missions', 'available', user.userId], (oldData) => {
					const claimedMission = oldData.find((a) => a.id === mission.id);

					const index = oldData.indexOf(claimedMission);
					oldData.splice(index, 1); // Remove the claimed mission

					return [...oldData];
				});

				// Add mission to claimed badges
				queryClient.setQueryData<Mission[]>(['missions', 'claimed', user.userId], (oldData) => [
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
	const axios = useAxios();
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(mission: Mission) => {
			const query = `/missions/${user.userId}/unclaim/${mission.id}`;
			mockEndpoint(200).onPost(query).replyOnce<string>(200, 'OK');
			return axios.post<string>(query);
		},
		{
			onSuccess: (res, mission) => {
				// Remove mission from claimed badges
				queryClient.setQueryData<Mission[]>(['missions', 'claimed', user.userId], (oldData) => {
					const claimedMission = oldData.find((a) => a.id === mission.id);

					const index = oldData.indexOf(claimedMission);
					oldData.splice(index, 1);

					return [...oldData];
				});

				// Add mission to available missions
				queryClient.setQueryData<Mission[]>(['missions', 'available', user.userId], (oldData) => [
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
