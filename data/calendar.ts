import { addDays, subDays } from 'date-fns';
import { useQuery } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';

export interface Task {
	id: number;
	plantId: number;
	datetime: Date;
	name: string;
	complete: boolean;
}

export const useTasks = (userId: number | 'me') => {
	return useQuery(['tasks', userId], () => {
		const query = `/tasks/${userId}`;
		mockEndpoint(250)
			.onGet(query)
			.replyOnce<Task[]>(200, [
				{ id: 1, plantId: 1, datetime: new Date(), name: 'Water Edward', complete: false },
				{ id: 2, plantId: 2, datetime: subDays(new Date(), 2), name: 'Water RichLucifernard', complete: false },
				{ id: 3, plantId: 1, datetime: addDays(new Date(), 2), name: 'Fertilize Edward', complete: false },
				{ id: 4, plantId: 2, datetime: addDays(new Date(), 3), name: 'Prune Lucifern', complete: false },
				{ id: 5, plantId: 3, datetime: addDays(new Date(), 4), name: 'Prune Momo', complete: false },
				{ id: 6, plantId: 4, datetime: addDays(new Date(), 4), name: 'Prune Boo', complete: false },
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
