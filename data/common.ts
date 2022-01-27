import { useQuery } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';

export interface Plant {
	id: number;
	name: string;
	scientificName: string;
	image: string | undefined;
}

export interface Sensor {
	sensorId: number;
	plant: Plant;
	soilMoisture: number;
	temperature: number;
	humidity: number;
	lux: number;
}

export const useTestEndpoint = () => {
	return useQuery(['testEndpoint'], () => {
		mockEndpoint(500)
			.onGet('/flourish-test')
			.reply<Plant[]>(200, [
				{
					id: 1,
					name: 'Fredrick',
					scientificName: 'Fredrickitios',
					image: undefined,
				},
				{
					id: 2,
					name: 'Richard',
					scientificName: 'Richardrock',
					image: undefined,
				},
			]);
		return AxiosInstance.get<Plant[]>('/flourish-test').then(res => res.data);
	});
};
