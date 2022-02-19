import { useQuery } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';
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
}

const tempMyPlants: Plant[] = [
	{
		id: 1,
		name: 'Edward',
		commonName: 'Heartleaf Philodendron',
		scientificName: 'Philodendron Hederaceum',
		image: 'https://cityfloralgreenhouse.com/wp-content/uploads/2021/02/photo-1600411833196-7c1f6b1a8b90.jpg',
	},
	{
		id: 2,
		name: 'Lucifern',
		commonName: 'Asparagus Fern',
		scientificName: 'Sprengeri Compacta',
		image: 'https://www.monrovia.com/media/amasty/blog/1024x577_dwarf_asparagus_fern.jpg',
	},
	{
		id: 3,
		name: 'MoMo',
		commonName: 'Monstera',
		scientificName: 'Monstera Deliciosa',
		image: 'https://i.pinimg.com/originals/7b/6f/02/7b6f0284cb2e6f92467371ec9fadfa04.jpg',
	},
	{
		id: 4,
		name: 'Boo',
		commonName: 'Bamboo',
		scientificName: 'Bambusoideae',
		image: 'https://empire-s3-production.bobvila.com/slides/26616/vertical_slide_wide/plants-without-soil-lucky-bamboo.jpg?1532362527',
	},
];

export const usePlants = (userId: number | 'me') => {
	const { data: user } = useMe();
	if (userId === 'me') userId = user?.id;

	return useQuery(
		['users', userId, 'plants'],
		async () => {
			const query = `/users/${userId}/plants`;
			mockEndpoint(250).onGet(query).replyOnce<Plant[]>(200, tempMyPlants);
			return AxiosInstance.get<Plant[]>(query).then((res) => res.data);
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

export function tempMyPlantData(): PlantMetrics {
	return {
		deviceId: 1,
		time: new Date(),
		soilMoisture: {
			raw: 600,
			// @ts-ignore
			range: Math.floor(Math.random() * 5) + 1,
		},
		light: {
			raw: 35000,
			// @ts-ignore
			range: Math.floor(Math.random() * 5) + 1,
		},
		temperature: {
			raw: 70,
			// @ts-ignore
			range: Math.floor(Math.random() * 5) + 1,
		},
		humidity: {
			raw: 20,
			// @ts-ignore
			range: Math.floor(Math.random() * 5) + 1,
		},
		additional: {},
	};
}

export const usePlantData = (plantId: number) => {
	return useQuery(['plants', plantId, 'data'], () => {
		const query = `/plants/${plantId}/data`;
		mockEndpoint(250).onGet(query).replyOnce<PlantMetrics>(200, tempMyPlantData());
		return AxiosInstance.get<PlantMetrics>(query).then(({ data }) => ({ ...data, time: new Date(data.time) }));
	});
};
