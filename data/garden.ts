import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { ApiUrl, AxiosInstance } from './api';
import { useMe } from './user';

export interface Sensor {
	id: number;
	model: string;
	deviceType: string;
	deviceState: string;
	userId: number;
	name: string;
	ip: string;
	apiVersion: string;
	softwareVersion: string;
}

export interface Plant {
	id: number;
	name: string;
	image: string | null;
	gaugeRatings: {
		light: MetricRange;
		temperature: MetricRange;
		humidity: MetricRange;
		soilMoisture: MetricRange;
	};
	sensorData: {
		timestamp: string;
		light: number;
		temperature: number;
		humidity: number;
		soilMoisture: number;
	};
}

export type PlantMetric = 'Water' | 'Sunlight' | 'Temperature' | 'Humidity';
export const plantMetrics: PlantMetric[] = ['Water', 'Sunlight', 'Temperature', 'Humidity'];

export type MetricRange = 1 | 2 | 3 | 4 | 5;

export function randomMetricRange(): MetricRange {
	return Math.floor(Math.random() * (5 - 1 + 1) + 1) as MetricRange;
}

export const usePlants = (userId: number | 'me') => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['users', userId, 'plants'],
		async () => {
			const query = `${ApiUrl}/users/${userId}/plants`;
			const plants = (await axios.get<Plant[]>(query)).data;

			return plants.map((p, index) => {
				const plant = {
					...p,
					gaugeRatings: {
						light: randomMetricRange(),
						temperature: randomMetricRange(),
						humidity: randomMetricRange(),
						soilMoisture: randomMetricRange(),
					},
				};

				const singlePlantQuery = ['users', userId, 'plants', p.id];
				if (!!queryClient.getQueryData(singlePlantQuery)) {
					queryClient.setQueryData(singlePlantQuery, plant);
				}

				return plant;
			});
		},
		{
			enabled: !!user,
		}
	);
};

export interface PlantInDepth extends Plant {
	deviceId: number;
	plantTypeId: number;
	plantType: {
		id: number;
		scientificName: string;
		minimumLight: number;
		maximumLight: number;
		minimumTemperature: number;
		maximumTemperature: number;
		minimumHumidity: number;
		maximumHumidity: number;
		minimumSoilMoisture: number;
		maximumSoilMoisture: number;
		image: string | null;
	};
}

export const useSinglePlant = (userId: number | 'me', plantId: number) => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;
	const { data: plants } = usePlants(userId);

	return useQuery(
		['users', userId, 'plants', plantId],
		async () => {
			return plants.find((p) => p.id === plantId);
		},
		{
			enabled: !!user && !!plants,
		}
	);
};

export interface PlantType {
	id: number;
	scientificName: string;
	minimumLight: number;
	maximumLight: number;
	minimumTemperature: number;
	maximumTemperature: number;
	minimumHumidity: number;
	maximumHumidity: number;
	minimumSoilMoisture: number;
	maximumSoilMoisture: number;
	image: string | null;
}

export const usePlantTypes = () => {
	return useQuery(['garden', 'plant-types'], async () => {
		const query = '/plant_types';
		return (await AxiosInstance.get<PlantType[]>(query)).data;
	});
};
