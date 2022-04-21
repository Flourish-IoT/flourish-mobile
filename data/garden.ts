import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiUrl, AxiosInstance, mockEndpoint } from './api';
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

export interface PlantType {
	id: number;
	commonName: string;
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
	return useQuery(['garden', 'plant-types'], () => {
		const query = '/plant_types';
		mockEndpoint(200)
			.onGet(query)
			.replyOnce<PlantType[]>(200, [
				{
					id: 2,
					commonName: 'Jade',
					scientificName: 'Crassula ovata',
					minimumLight: 2153,
					maximumLight: 6458,
					minimumTemperature: 10,
					maximumTemperature: 23.89,
					minimumHumidity: 0.3,
					maximumHumidity: 0.5,
					minimumSoilMoisture: 0.1,
					maximumSoilMoisture: 0.3,
					image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHG32HP5Ht1UpNymdiTf-m58JBCVABgl-DtkPO9hwLMiN9AOvhJfk2hIWBfM2CmCiANI&usqp=CAU',
				},
				{
					id: 3,
					commonName: 'Spider Plant',
					scientificName: 'Chlorophytum comosum',
					minimumLight: 1076,
					maximumLight: 10764,
					minimumTemperature: 4.44,
					maximumTemperature: 32.22,
					minimumHumidity: 0.4,
					maximumHumidity: 0.6,
					minimumSoilMoisture: 0.4,
					maximumSoilMoisture: 0.6,
					image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hierbabuena_0611_Revised.jpg/1200px-Hierbabuena_0611_Revised.jpg',
				},
				{
					id: 4,
					commonName: "Devil's Ivy",
					scientificName: 'Epipremnum aureum',
					minimumLight: 5000,
					maximumLight: 21500,
					minimumTemperature: 21.11,
					maximumTemperature: 32.22,
					minimumHumidity: 0.5,
					maximumHumidity: 0.7,
					minimumSoilMoisture: 0.3,
					maximumSoilMoisture: 0.6,
					image: 'https://www.gardenstuff.it/36441-large_default/pothos-epipremnum-aureum-or-scindapsus-aurens.jpg',
				},
				{
					id: 5,
					commonName: 'Dracaena',
					scientificName: 'Dracaena',
					minimumLight: 1076,
					maximumLight: 6458,
					minimumTemperature: 12.78,
					maximumTemperature: 23.89,
					minimumHumidity: 0.2,
					maximumHumidity: 0.8,
					minimumSoilMoisture: 0.1,
					maximumSoilMoisture: 0.4,
					image: 'https://www.gardeningknowhow.com/wp-content/uploads/2012/07/dracaena-1-797x1024.jpg',
				},
				{
					id: 6,
					commonName: 'Snake Plant',
					scientificName: 'Dracaena trifasciata',
					minimumLight: 1076,
					maximumLight: 6458,
					minimumTemperature: 12.78,
					maximumTemperature: 32,
					minimumHumidity: 0.2,
					maximumHumidity: 0.8,
					minimumSoilMoisture: 0.1,
					maximumSoilMoisture: 0.4,
					image: 'https://www.thespruce.com/thmb/HtNVl5_9nAJpPYiN2a8579nDgZk=/1545x1545/smart/filters:no_upscale()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg',
				},
			]);
		return AxiosInstance.get<PlantType[]>(query).then((res) => res.data);
	});
};
