import { MetricRange, PlantMetric } from '../../data/garden';

const AppConfig = require('../../app.json');

export const AppName = AppConfig.expo.name;

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

export function filterData<T>(data?: T[], query?: string) {
	if (!data) return [];

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
