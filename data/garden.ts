import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
		light: GaugeValue;
		temperature: GaugeValue;
		humidity: GaugeValue;
		soilMoisture: GaugeValue;
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

			return plants.map((plant, index) => {
				const singlePlantQuery = ['users', userId, 'plants', plant.id];
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
	const queryClient = useQueryClient();

	return useQuery(['garden', 'plant-types'], async () => {
		const query = '/plant_types';
		const plants = (await axios.get<PlantType[]>(ApiUrl + query)).data;

		plants.forEach((p) => queryClient.setQueryData(['garden', 'plant-types', p.id], p));

		return plants;
	});
};

export const useSinglePlantType = (plantTypeId: number) => {
	const queryClient = useQueryClient();

	return useQuery(['garden', 'plant-types', plantTypeId], async () => {
		const query = `/plant_types/${plantTypeId}`;
		const plant = (await AxiosInstance.get<PlantType>(query)).data;

		if (!!queryClient.getQueryData<PlantType[]>(['garden', 'plant-types'])) {
			queryClient.setQueryData<PlantType[]>(['garden', 'plant-types'], (oldData) => {
				return [...oldData.filter((p) => p.id !== plantTypeId), plant];
			});
		}

		return plant;
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
