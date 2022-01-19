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
