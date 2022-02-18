import { useMutation, useQuery, useQueryClient } from 'react-query';
import { mockEndpoint, AxiosInstance } from './api';
import { useMe, User } from './user';

export interface Achievement {
	id: number;
	title: string;
	description: string;
	level: number;
	points: number;
	image?: string;
	progress: number; // 0-100 (represents a %)
	claimed: boolean;
}

const tempMyAchievements: Achievement[] = [
	{
		id: 1,
		title: 'The Journey Begins',
		image: undefined,
		description: 'Add your first plant to a collection!',
		level: 1,
		points: 100,
		progress: 100,
		claimed: true,
	},
	{
		id: 2,
		title: 'Monstera Monster',
		image: undefined,
		description: 'Keep your Monstera alive for at least 30 days',
		level: 1,
		points: 1000,
		progress: 100,
		claimed: false,
	},
	{
		id: 3,
		title: 'Fern-It-Up',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 250,
		progress: 100,
		claimed: false,
	},
	{
		id: 4,
		title: 'Fern-It-Up-2',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 1,
		points: 300,
		progress: 100,
		claimed: false,
	},
	{
		id: 5,
		title: 'Fern-It-Up-3',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 2,
		points: 250,
		progress: 35,
		claimed: false,
	},
	{
		id: 6,
		title: 'Fern-It-Up-3',
		image: undefined,
		description: 'Add 5 indoor plants to your home collection.',
		level: 2,
		points: 250,
		progress: 100,
		claimed: false,
	},
];

export const useAchievements = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['achievements', 'all', userId],
		async () => {
			const query = `/achievements/${userId}`;
			mockEndpoint(250).onGet(query).replyOnce<Achievement[]>(200, tempMyAchievements);
			const { data: achievements } = await AxiosInstance.get<Achievement[]>(query);
			// Sort: First by level (lower first) then by points (lower first)
			const sorted = achievements.sort((a, b) => (a.level === b.level ? a.points - b.points : a.level - b.level));
			return sorted;
		},
		{
			enabled: !!user,
		}
	);
};

export const useAvailableAchievements = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;
	const { data: achievements } = useAchievements(userId);

	return useQuery(
		['achievements', 'available', userId],
		async () => {
			return achievements.filter((a) => !a.claimed);
		},
		{
			enabled: !!user && !!achievements,
		}
	);
};

export const useClaimedAchievements = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;
	const { data: achievements } = useAchievements(userId);

	return useQuery(
		['achievements', 'claimed', userId],
		async () => {
			return achievements.filter((a) => a.claimed);
		},
		{
			enabled: !!user && !!achievements,
		}
	);
};

export const useClaimAchievement = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(achievement: Achievement) => {
			const query = `/achievements/${user.id}/claim/${achievement.id}`;
			mockEndpoint(250).onPost(query).replyOnce<string>(200, 'OK');
			return AxiosInstance.post<string>(query);
		},
		{
			onSuccess: (res, achievement) => {
				// Remove achievement from available achievements
				queryClient.setQueryData<Achievement[]>(['achievements', 'available', user.id], (oldData) => {
					const claimedAchievement = oldData.find((a) => a.id === achievement.id);

					const index = oldData.indexOf(claimedAchievement);
					oldData.splice(index, 1); // Remove the claimed achievement

					return [...oldData];
				});

				// Add achievement to claimed badges
				queryClient.setQueryData<Achievement[]>(['achievements', 'claimed', user.id], (oldData) => [
					...oldData,
					{ ...achievement, claimed: true },
				]);

				// Add xp to user
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					xp: oldData.xp + achievement.points,
				}));
			},
		}
	);
};

export const useUnClaimAchievement = () => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useMutation(
		(achievement: Achievement) => {
			const query = `/achievements/${user.id}/unclaim/${achievement.id}`;
			mockEndpoint(250).onPost(query).replyOnce<string>(200, 'OK');
			return AxiosInstance.post<string>(query);
		},
		{
			onSuccess: (res, achievement) => {
				// Remove achievement from claimed badges
				queryClient.setQueryData<Achievement[]>(['badges', user.id], (oldData) => {
					const claimedAchievement = oldData.find((a) => a.id === achievement.id);

					const index = oldData.indexOf(claimedAchievement);
					oldData.splice(index, 1);

					return [...oldData];
				});

				// Add achievement to available achievements
				queryClient.setQueryData<Achievement[]>(['achievements', user.id], (oldData) => [
					...oldData,
					{ ...achievement, claimed: false },
				]);

				// Remove xp from user
				queryClient.setQueryData<User>(['me'], (oldData) => ({
					...oldData,
					xp: oldData.xp - achievement.points,
				}));
			},
		}
	);
};
