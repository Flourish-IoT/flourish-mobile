import { addDays, subDays } from 'date-fns';
import { useQuery } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';

export interface Task {
	id: number;
	plantId: number;
	datetime: Date;
	title: string;
	description?: string;
	complete: boolean;
}

export const useTasks = (userId: number | 'me') => {
	return useQuery(['tasks', userId], () => {
		const query = `/tasks/${userId}`;
		mockEndpoint(250)
			.onGet(query)
			.replyOnce<Task[]>(200, [
				{ id: 1, plantId: 1, datetime: new Date(), title: 'Water Edward', description: '', complete: false },
				{
					id: 2,
					plantId: 2,
					datetime: subDays(new Date(), 2),
					title: 'Water RichLucifernard',
					description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
					complete: false,
				},
				{
					id: 3,
					plantId: 1,
					datetime: addDays(new Date(), 2),
					title: 'Fertilize Edward',
					description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
					complete: false,
				},
				{
					id: 4,
					plantId: 2,
					datetime: addDays(new Date(), 3),
					title: 'Prune Lucifern',
					description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
					complete: false,
				},
				{ id: 5, plantId: 3, datetime: addDays(new Date(), 4), title: 'Prune Momo', description: '', complete: false },
				{ id: 6, plantId: 4, datetime: addDays(new Date(), 4), title: 'Prune Boo', description: '', complete: false },
			]);
		return AxiosInstance.get<Task[]>(query).then((res) =>
			res.data
				.map((t) => {
					// Turn ISO into a JS date
					t.datetime = new Date(t.datetime);
					return t;
				})
				.sort((a, b) => a.datetime.valueOf() - b.datetime.valueOf())
		);
	});
};
