import { addDays, subDays } from 'date-fns';
import { useQuery } from 'react-query';
import { mockEndpoint, useAxios } from './api';

export type TaskCategory = 'water' | 'rotate' | 'fertilize' | 'repot' | 'prune' | 'other';

export interface Task {
	id: number;
	plantId: number;
	dateTime: Date;
	title: string;
	category: TaskCategory;
	description?: string;
	complete: boolean;
}

export const useTasks = (userId: number | 'me') => {
	const axios = useAxios();

	return useQuery(['tasks', userId], () => {
		const query = `/tasks/${userId}`;
		mockEndpoint(200).onGet(query).replyOnce<Task[]>(200, tempMyTasks);
		return axios.get<Task[]>(query).then((res) =>
			res.data
				.map((t) => {
					// Turn ISO into a JS date
					t.dateTime = new Date(t.dateTime);
					return t;
				})
				.sort((a, b) => a.dateTime.valueOf() - b.dateTime.valueOf())
		);
	});
};

export const tempMyTasks: Task[] = [
	{
		id: 1,
		plantId: 6,
		dateTime: new Date(),
		title: 'Water Edward',
		category: 'water',
		description: '',
		complete: false,
	},
	{
		id: 2,
		plantId: 10,
		dateTime: subDays(new Date(), 2),
		title: 'Water Lucifern',
		category: 'water',
		description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
		complete: false,
	},
	{
		id: 3,
		plantId: 6,
		dateTime: addDays(new Date(), 2),
		title: 'Fertilize Edward',
		category: 'fertilize',
		description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
		complete: false,
	},
	{
		id: 4,
		plantId: 10,
		dateTime: addDays(new Date(), 3),
		title: 'Prune Lucifern',
		category: 'prune',
		description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
		complete: false,
	},
	{
		id: 5,
		plantId: 8,
		dateTime: addDays(new Date(), 4),
		title: 'Prune Momo',
		category: 'prune',
		description: '',
		complete: false,
	},
	{
		id: 6,
		plantId: 9,
		dateTime: addDays(new Date(), 4),
		title: 'Prune Boo',
		category: 'prune',
		description: '',
		complete: false,
	},
];
