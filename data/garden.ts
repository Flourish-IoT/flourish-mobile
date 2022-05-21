import axios from 'axios';
import { format, isSameDay, subDays } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { formatTemp } from '../lib/utils/helper';
import { ApiUrl, mockEndpoint } from './api';
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
	if (userId === 'me') userId = user?.userId;

	return useQuery(
		['users', userId, 'plants'],
		async () => {
			const query = `/users/${userId}/plants`;
			const plants = (await axios.get<Plant[]>(ApiUrl + query)).data;

			return plants.map((plant) => {
				const frontEndPlant = {
					...plant,
					sensorData: {
						...plant.sensorData,
						temperature: formatTemp(user.preferences.unit_preference, plant?.sensorData?.temperature),
					},
				};

				queryClient.setQueryData(['users', userId, 'plants', plant.id], frontEndPlant);
				return frontEndPlant;
			});
		},
		{
			enabled: !!user,
		}
	);
};

export const useSinglePlant = (userId: number | 'me', plantId: number) => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.userId;
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
				const frontEndPlant = {
					...p,
					minimumTemperature: formatTemp(tempPref, p.minimumTemperature),
					maximumTemperature: formatTemp(tempPref, p.maximumTemperature),
				};

				queryClient.setQueryData(['garden', 'plant-types', p.id], p);

				return frontEndPlant;
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
		const query = `/users/${user.userId}/devices`;
		const params = {
			deviceType: sensor.deviceType,
			model: sensor.model,
			name: sensor.name,
			apiVersion: sensor.apiVersion,
			softwareVersion: sensor.softwareVersion,
		};

		try {
			mockEndpoint(200)
				.onPost(ApiUrl + query, params)
				.replyOnce<string>(200, 'OK');
			return (await axios.post<string>(ApiUrl + query, params)).data;
		} catch (error) {
			console.error('Failed to add device.');
		}
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
		mockEndpoint(200)
			.onPost(ApiUrl + query, params)
			.replyOnce<string>(200, 'OK');
		return (await axios.post<string>(ApiUrl + query, params)).data;
	});
};

interface HistoricalRes {
	humidity: number;
	light: number;
	soilMoisture: number;
	temperature: number;
	timestamp: string | Date;
}

interface HistoricalWeek {
	weekDay: string;
	percentOfBar: number;
}

const getHistoricalDataPropName = (metricType: PlantMetric) => {
	switch (metricType) {
		case 'Water':
			return {
				resProp: 'soilMoisture',
				minProp: 'minimumSoilMoisture',
				maxProp: 'maximumSoilMoisture',
			};
		case 'Sunlight':
			return {
				resProp: 'light',
				minProp: 'minimumLight',
				maxProp: 'maximumLight',
			};
		case 'Temperature':
			return {
				resProp: 'temperature',
				minProp: 'minimumTemperature',
				maxProp: 'maximumTemperature',
			};
		case 'Humidity':
			return {
				resProp: 'humidity',
				minProp: 'minimumHumidity',
				maxProp: 'maximumHumidity',
			};
	}
};

export const useHistoricalPlantData = (plant: Plant, dataPoint: PlantMetric) => {
	const { data: plantType } = useSinglePlantType(plant.plantType.id);
	const start = subDays(new Date(), 7).toISOString();
	const end = new Date().toISOString();

	return useQuery(
		['garden', plant.id, 'historical-data', dataPoint],
		async () => {
			const query = `/plants/${plant.id}/data?start=${start}&end=${end}`;
			const history = (await axios.get<HistoricalRes[]>(ApiUrl + query)).data.map((d) => {
				// Turn ISO into a JS date
				d.timestamp = new Date(d.timestamp);
				return d;
			});

			const groups: HistoricalWeek[] = [];
			const today = new Date();

			for (let i = 6; i > -1; i--) {
				const currentDay = subDays(today, i);
				const dataPointsInDay = history.filter((d) => isSameDay(currentDay, d.timestamp as Date));

				if (dataPointsInDay.length > 0) {
					const { resProp, minProp, maxProp } = getHistoricalDataPropName(dataPoint);
					const min = plantType[minProp];
					const max = plantType[maxProp];
					const average = dataPointsInDay.map((d) => d[resProp]).reduce((a, b) => a + b) / dataPointsInDay.length;
					let percentage = ((average - min) * 100) / (max - min);

					if (percentage > 100) percentage = 100;
					if (percentage < 0) percentage = 0;

					console.log({ min, average, max, percentage });

					groups.push({
						weekDay: format(currentDay, 'EEEEEE'),
						percentOfBar: percentage,
					});
				}
			}

			return groups;
		},
		{
			enabled: !!plantType,
		}
	);
};
