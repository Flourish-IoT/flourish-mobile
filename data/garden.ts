import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatTemp } from '../lib/utils/helper';
import { ApiUrl } from './api';
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
	deviceId: number;
	plantType: {
		id: number;
		scientificName: string;
	};
	gaugeRatings: {
		light: GaugeValue;
		temperature: GaugeValue;
		humidity: GaugeValue;
		soilMoisture: GaugeValue;
	};
	sensorData: {
		timestamp: string;
		temperature: number;
		humidity: number;
		soilMoisture: number;
		light: number;
	};
}

export type PlantMetric = 'Water' | 'Sunlight' | 'Temperature' | 'Humidity';
export const plantMetrics: PlantMetric[] = ['Water', 'Sunlight', 'Temperature', 'Humidity'];

export type GaugeValue = 1 | 2 | 3 | 4 | 5;

export const usePlants = (userId: number | 'me') => {
	const queryClient = useQueryClient();
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['users', userId, 'plants'],
		async () => {
			const query = `${ApiUrl}/users/${userId}/plants`;
			const plants = (await axios.get<Plant[]>(query)).data;
			const tempPref = user.preferences.unit_preference;

			return plants.map((plant) => {
				const singlePlantQuery = ['users', userId, 'plants', plant.id];
				if (!!queryClient.getQueryData(singlePlantQuery)) {
					queryClient.setQueryData(singlePlantQuery, plant);
				}

				return {
					...plant,
					sensorData: {
						...plant.sensorData,
						temperature: formatTemp(tempPref, plant?.sensorData?.temperature),
					},
				};
			});
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

	return useQuery(['users', userId, 'plants', plantId], () => plants.find((p) => p.id === plantId), {
		enabled: !!user && !!plants,
	});
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
	const queryClient = useQueryClient();
	const { data: user } = useMe();

	return useQuery(
		['garden', 'plant-types'],
		async () => {
			const query = '/plant_types';
			const plants = (await axios.get<PlantType[]>(ApiUrl + query)).data;
			const tempPref = user.preferences.unit_preference;

			return plants.map((p) => {
				queryClient.setQueryData(['garden', 'plant-types', p.id], p);
				return {
					...p,
					minimumTemperature: formatTemp(tempPref, p.minimumTemperature),
					maximumTemperature: formatTemp(tempPref, p.maximumTemperature),
				};
			});
		},
		{
			enabled: !!user,
		}
	);
};

export const useSinglePlantType = (plantTypeId: number) => {
	const { data: plantTypes } = usePlantTypes();

	return useQuery(['garden', 'plant-types', plantTypeId], () => plantTypes.find(({ id }) => id === plantTypeId), {
		enabled: !!plantTypes,
	});
};

export const useAddDevice = () => {
	const { data: user } = useMe();

	return useMutation(async (sensor: Sensor) => {
		const query = `/users/${user.id}/devices`;

		const res = await axios.post<string>(ApiUrl + query, {
			deviceType: sensor.deviceType,
			model: sensor.model,
			name: sensor.name,
			apiVersion: sensor.apiVersion,
			softwareVersion: sensor.softwareVersion,
		});

		return res.data;
	});
};

interface AddPlantParams {
	name: string;
	plantTypeId: number;
	deviceId: number;
	image: string | null;
}

export const useAddPlant = () => {
	return useMutation(async (params: AddPlantParams) => {
		const query = '/plants';
		const res = await axios.post<string>(ApiUrl + query, { params });
		return res.data;
	});
};
