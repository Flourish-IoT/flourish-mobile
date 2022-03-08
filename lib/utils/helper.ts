import { MetricRange, PlantMetric } from '../../data/garden';
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

export function getFullMetricName(metric: PlantMetric) {
	switch (metric) {
		case 'Water':
			return 'Soil Moisture';
		default:
			return metric;
	}
}

export function getMetricRangeDescription(metric: MetricRange) {
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
}

export function getMetricGaugeColor(metric: MetricRange) {
	switch (metric) {
		case 1:
		case 5:
			return '#FF614A';
		case 2:
		case 4:
			return '#FFDB3F';
		case 3:
			return '#10B295';
	}
}

export function getUserLevel(xp: number) {
	return Math.floor(0.06 * Math.sqrt(xp));
}

export function getUserLevelName(level: number) {
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
}

export const chunkArray = (array: any[], amountPerChunk: number) =>
	array.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / amountPerChunk);
		if (!resultArray[chunkIndex]) resultArray[chunkIndex] = []; // start a new chunk
		resultArray[chunkIndex].push(item);
		return resultArray;
	}, []);

export const getPlaceHolder = (fileName: 'plant' | 'profile') => {
	const path = '../assets/placeholder/';

	const images = {
		plant: require(path + 'plant.png'),
		profile: require(path + 'profile.png'),
	};

	return images[fileName];
};

export const arrayHasInCommon = (arr1: any[], arr2: any[]) => {
	if (arr1.length === 0 || arr2.length === 0) return false;
	return arr1.some((item) => arr2.includes(item));
};
