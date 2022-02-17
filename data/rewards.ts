import { useMutation, useQuery, useQueryClient } from 'react-query';
import { mockEndpoint, AxiosInstance } from './api';
import { useMe } from './user';

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
		progress: 50,
		claimed: true,
	},
	{
		id: 2,
		title: 'Monstera Monster',
		image: undefined,
		description: 'Keep your Monstera alive for at least 30 days',
		level: 1,
		points: 300,
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
		progress: 20,
		claimed: false,
	},
];

export const useAchievements = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['achievements', userId],
		async () => {
			const query = `/achievements/${userId}`;
			mockEndpoint(250).onGet(query).replyOnce<Achievement[]>(200, tempMyAchievements);
			return AxiosInstance.get<Achievement[]>(query).then((res) => res.data);
		},
		{
			enabled: !!user,
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
				queryClient.setQueryData<Achievement[]>(['achievements', user.id], (oldData) => {
					const claimedAchievement = oldData.find((a) => a.id === achievement.id);

					const index = oldData.indexOf(claimedAchievement);
					if (index > -1) {
						oldData.splice(index, 1); // 2nd parameter means remove one item only
					}

					achievement.claimed = true;
					return [...oldData, achievement];
				});
			},
		}
	);
};
