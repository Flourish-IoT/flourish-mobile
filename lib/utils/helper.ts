const AppConfig = require('../../app.json');

export const AppName = AppConfig.expo.name;

export const isValidUsername = (value: string) => {
	const regex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
	return regex.test(value.toLowerCase());
};

export const isValidEmail = (value: string) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(value.toLowerCase());
};

export const isValidPassword = (value: string) => {
	const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
	return regex.test(value);
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
