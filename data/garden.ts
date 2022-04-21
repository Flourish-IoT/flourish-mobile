import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiUrl } from './api';
import { useMe } from './user';

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
	targetValueRatings: {
		light: MetricRange;
		temperature: MetricRange;
		humidity: MetricRange;
		soilMoisture: MetricRange;
	};
	rawUnits: {
		light: number;
		temperature: number;
		humidity: number;
		soilMoisture: number;
	};
}

export interface PlantMetrics {
	deviceId: number;
	time: Date;
	temperature: PlantMetricObj;
	humidity: PlantMetricObj;
	light: PlantMetricObj;
	soilMoisture: PlantMetricObj;
	additional: object; // TODO: Need to fill this out at some point
}

export interface PlantMetricObj {
	raw: number;
	range: MetricRange;
}

export type PlantMetric = 'Water' | 'Sunlight' | 'Temperature' | 'Humidity';
export const plantMetrics: PlantMetric[] = ['Water', 'Sunlight', 'Temperature', 'Humidity'];

export type MetricRange = 1 | 2 | 3 | 4 | 5;

export const usePlants = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['users', userId, 'plants'],
		async () => {
			const query = `${ApiUrl}/users/${userId}/plants`;
			const data = (await axios.get<Plant[]>(query)).data;
			return data.map((p) => ({
				...p,
				rawUnits: {
					soilMoisture: 600,
					light: 35000,
					temperature: 70,
					humidity: 20,
				},
				targetValueRatings: {
					...p.targetValueRatings,
					soilMoisture: p.targetValueRatings.light ?? 4,
					light: p.targetValueRatings.light ?? 2,
					temperature: p.targetValueRatings.light ?? 3,
					humidity: p.targetValueRatings.light ?? 1,
				},
			}));
		},
		{
			enabled: !!user,
		}
	);
};

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
