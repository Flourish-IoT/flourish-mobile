import { useQuery } from 'react-query';
import { AxiosInstance } from './api';

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
		return AxiosInstance.get<Sensor>('/flourish-test').then(res => res.data);
	});
};
