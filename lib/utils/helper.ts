import { GaugeValue, PlantMetric, useSinglePlantType } from '../../data/garden';
import { Theme } from '../../providers/Theme';
import { Service } from '../../screens/welcome/SignUp';
import AppConfig from '../../app.config';
import { useQuery, useQueryClient } from 'react-query';
import { UnitPreference, useMe, User } from '../../data/user';
import { isBefore, subDays, format, isYesterday, isToday, isTomorrow, isAfter, addDays, addWeeks } from 'date-fns';

export const AppName = AppConfig.name;

export const getServiceColor = (service: Service) => {
	switch (service) {
		case 'Apple':
			return 'black';
		case 'Facebook':
			return '#4267B2';
		case 'Google':
			return '#4285F4';
	}
};

export const padString = (text: string | number, direction: 'left' | 'right', length: number, char: string) => {
	// Adds enough of the specified character to make text as long as length
	text = String(text);
	while (text.length < length) text = direction === 'left' ? char + text : text + char;
	return text;
};

export const getMonthName = (month: number) => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return monthNames[month];
};

export const formatTemp = (tempUnitPref: UnitPreference, num: number) => {
	const converted = tempUnitPref && tempUnitPref === 'Fahrenheit' ? (num * 9) / 5 + 32 : num;
	return Math.round((converted + Number.EPSILON) * 100) / 100;
};

export function filterData<T>(data: T[], query: string) {
	if (!data || !query || query.trim().length === 0) return data;

	const normalize = (text: string) => text.toString().replace(/\s/g, '').toLowerCase();

	function getObjectValues<T>(obj: T): string {
		return Object.values(obj).reduce((string, val) => {
			const hasValue = val !== null && val !== undefined;

			if (hasValue) {
				return string + normalize(typeof val === 'object' ? getObjectValues(val) : val);
			}

			return string;
		}, '');
	}

	return data.filter((d) => (query && query.length > 0 ? getObjectValues(d).includes(normalize(query)) : true));
}

export const getFullMetricName = (metricType: PlantMetric) => {
	switch (metricType) {
		case 'Water':
			return 'Soil Moisture';
		default:
			return metricType;
	}
};

export const getMetricUnitSuffix = (metricType: PlantMetric) => {
	const queryClient = useQueryClient();
	const user = queryClient?.getQueryData<User>(['me']);
	const tempUnitPref = user?.preferences?.unit_preference;

	switch (metricType) {
		case 'Water':
		case 'Humidity':
			return '%';
		case 'Sunlight':
			return 'k lux';
		case 'Temperature':
			return `°${tempUnitPref[0] ?? ''}`;
	}
};

export const usePlantTypeBestRange = (plantTypeId: number, metricType: PlantMetric) => {
	const { data: plantType } = useSinglePlantType(plantTypeId);
	const { data: user } = useMe();
	const suffix = getMetricUnitSuffix(metricType);

	return useQuery(
		['garden', 'plant-types', plantTypeId, 'best-range', metricType],
		async () => {
			let minMetric: number;
			let maxMetric: number;

			switch (metricType) {
				case 'Humidity':
					minMetric = plantType.minimumHumidity;
					maxMetric = plantType.maximumHumidity;
					break;
				case 'Water':
					minMetric = plantType.minimumSoilMoisture;
					maxMetric = plantType.maximumSoilMoisture;
					break;
				case 'Temperature':
					const unitPref = user.preferences.unit_preference;
					minMetric = formatTemp(unitPref, plantType.minimumTemperature);
					maxMetric = formatTemp(unitPref, plantType.maximumTemperature);
					break;
				case 'Sunlight':
					minMetric = plantType.minimumLight;
					maxMetric = plantType.maximumLight;
					break;
			}

			return `${minMetric + suffix} - ${maxMetric + suffix}`;
		},
		{
			enabled: !!user && !!plantType && !!plantTypeId && !!metricType,
		}
	);
};

export const getGaugeValuePhrase = (gaugeValue: GaugeValue) => {
	switch (gaugeValue) {
		case 1:
			return 'Very Low';
		case 2:
			return 'Slightly Low';
		case 3:
			return 'Great';
		case 4:
			return 'Slightly High';
		case 5:
			return 'Very High';
	}
};

export const getMetricSuggestion = (metricType: PlantMetric, gaugeValue: GaugeValue, plantName: string) => {
	switch (metricType) {
		case 'Water':
			switch (gaugeValue) {
				case 1:
					return `${plantName} desperately needs watering.`;
				case 2:
					return `${plantName} could use a little more water.`;
				case 3:
					return `You don't need to water ${plantName} at this time.`;
				case 4:
					return `${plantName} has a little more water than needed.`;
				case 5:
					return `${plantName} may be over-watered.`;
			}
		case 'Humidity':
			switch (gaugeValue) {
				case 1:
					return `${plantName} needs more Humidity.`;
				case 2:
					return `Consider raising the Humidity around ${plantName}.`;
				case 3:
					return `${plantName} has the ideal amount of Humidity.`;
				case 4:
					return `Consider lowering the Humidity around ${plantName}.`;
				case 5:
					return `There's too much Humidity around ${plantName}.`;
			}
		case 'Sunlight':
			switch (gaugeValue) {
				case 1:
					return `${plantName} desperately needs more sunlight.`;
				case 2:
					return `Consider placing ${plantName} closer to a window.`;
				case 3:
					return `${plantName} has the ideal amount of Sunlight.`;
				case 4:
					return `Consider moving ${plantName} a little farther away from the light.`;
				case 5:
					return `${plantName} is receiving too much Sunlight.`;
			}
		case 'Temperature':
			switch (gaugeValue) {
				case 1:
					return `${plantName} is too cold.`;
				case 2:
					return `Consider raising the temperature for ${plantName}.`;
				case 3:
					return `${plantName} is in the ideal Temperature.`;
				case 4:
					return `Consider lowering the temperature for ${plantName}.`;
				case 5:
					return `${plantName} is too hot.`;
			}
	}
};

export const getGaugeValueColor = (gaugeValue: GaugeValue) => {
	switch (gaugeValue) {
		case 1:
		case 5:
			return Theme.colors.error;
		case 2:
		case 4:
			return Theme.colors.warning;
		case 3:
			return Theme.colors.passing;
	}
};

export const LevelMultiplier = 0.08;

export const getUserLevel = (xp: number) => {
	const potentialLvl = Math.floor(LevelMultiplier * Math.sqrt(xp));
	return potentialLvl < 1 ? 1 : potentialLvl;
};

export const getXpReqForLevel = (level: number) => {
	return Math.ceil(Math.pow(level / LevelMultiplier, 2));
};

export const getXpRangeOfLevel = (level: number) => {
	return getXpReqForLevel(level + 1) - getXpReqForLevel(level);
};

export const getRewardsProgress = (xp: number) => {
	const currentLevel = getUserLevel(xp);
	const xpProgressInLevel = xp - getXpReqForLevel(currentLevel);

	return {
		level: currentLevel,
		xp: xpProgressInLevel,
		percent: Math.floor((xpProgressInLevel / getXpRangeOfLevel(currentLevel)) * 100),
		required: getXpReqForLevel(currentLevel + 1) - xp,
	};
};

export const getUserLevelName = (level: number) => {
	switch (level) {
		case 1:
			return 'Plant Explorer';
		case 2:
			return 'Plant Enthusiast';
		case 3:
			return 'Plant Whisperer';
		default:
			return 'Plant Guru';
	}
};

export const chunkArray = (array: any[], amountPerChunk: number) =>
	array.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / amountPerChunk);
		if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []; // Start a new chunk
		resultArray[chunkIndex].push(item);
		return resultArray;
	}, []);

export const getPlaceHolder = (fileName: 'plant' | 'preSearchState') => {
	const path = '../assets/placeholder/';

	const images = {
		plant: require(path + 'plant.png'),
		preSearchState: require(path + 'preSearchState.png'),
	};

	return images[fileName];
};

export const arrayHasInCommon = (arr1: any[], arr2: any[]) => {
	if (arr1.length === 0 || arr2.length === 0) return false;
	return arr1.some((item) => arr2.includes(item));
};

export const getCloseDateText = (dateTime: Date) => {
	if (isBefore(dateTime, subDays(new Date(), 2))) {
		return format(dateTime, 'MM/dd/yy');
	} else if (isYesterday(dateTime)) {
		return 'Yesterday';
	} else if (isToday(dateTime)) {
		return 'Today';
	} else if (isTomorrow(dateTime)) {
		return 'Tomorrow';
	} else if (isAfter(dateTime, addDays(new Date(), 2)) && isBefore(dateTime, addWeeks(new Date(), 1))) {
		return format(dateTime, 'MM-dd');
	} else {
		return format(dateTime, 'EEEE');
	}
};
