import { useQuery } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';

export interface Sensor {
	sensorId: number;
	plant: Plant;
	soilMoisture: number;
	temperature: number;
	humidity: number;
	lux: number;
}

export interface Plant {
	id: number;
	name: string;
	commonName: string;
	scientificName: string;
	image?: string;
}

export const usePlants = () => {
	return useQuery(['testEndpoint'], () => {
		mockEndpoint(250)
			.onGet('/flourish-test')
			.replyOnce<Plant[]>(200, [
				{
					id: 1,
					name: 'Edward',
					commonName: 'Edward The Plant',
					scientificName: 'Edwardoian',
					image: undefined,
				},
				{
					id: 2,
					name: 'Lucifern',
					commonName: 'Lucifern The Plant',
					scientificName: 'Lucifernious',
					image: undefined,
				},
				{
					id: 3,
					name: 'Joe',
					commonName: 'Joe The Plant',
					scientificName: 'Joejoeian',
					image: undefined,
				},
				{
					id: 4,
					name: 'Olie',
					commonName: 'Olie The Plant',
					scientificName: 'Olieboyus',
					image: undefined,
				},
			]);
		return AxiosInstance.get<Plant[]>('/flourish-test').then((res) => res.data);
	});
};
