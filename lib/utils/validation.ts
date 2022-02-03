export const isValidUsername = (value: string) => {
	// 4-15 characters long, no -, no _ or . at the beginning, no __ or _. or ._ or .. inside, no _ or . at the end
	const regex = /^(?=[a-zA-Z0-9._]{4,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
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
