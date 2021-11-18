import { useQuery } from 'react-query';
import axios from 'axios';

export interface Sensor {
	sensorId: number;
	plant: Plant;
	soilMoisture: number;
	temperature: number;
	humidity: number;
	lux: number;
}

export interface Plant {
	name: string;
	id: number;
}

export const useTestEndpoint = () => {
	return useQuery(['testEndpoint'], () => {
		return axios.get<Sensor>('/flourish-test').then(res => res.data);
	});
};
