import { MetricRange, PlantMetric } from '../../data/garden';
import { Theme } from '../../providers/Theme';
import { Service } from '../../screens/welcome/SignUp';

const AppConfig = require('../../app.json');

export const AppName = AppConfig.expo.name;

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

export function filterData<T>(data: T[], query: string) {
	if (query.trim().length === 0) return data;

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

export const getFullMetricName = (metric: PlantMetric) => {
	switch (metric) {
		case 'Water':
			return 'Soil Moisture';
		default:
			return metric;
	}
};

export const getMetricRangeDescription = (metric: MetricRange) => {
	switch (metric) {
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

export const getMetricGaugeColor = (metric: MetricRange) => {
	switch (metric) {
		case 1:
		case 5:
			return Theme.colors.error;
		case 2:
		case 4:
			return Theme.colors.warning;
		case 3:
			return '#00A083';
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

export const getPlaceHolder = (fileName: 'plant') => {
	const path = '../assets/placeholder/';

	const images = {
		plant: require(path + 'plant.png'),
	};

	return images[fileName];
};

export const arrayHasInCommon = (arr1: any[], arr2: any[]) => {
	if (arr1.length === 0 || arr2.length === 0) return false;
	return arr1.some((item) => arr2.includes(item));
};
