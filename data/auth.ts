import axios from 'axios';

export const sendEmailVerificationCode = (email: string, password: string) => {
	return axios.post('/send_email_verification_code', {
		email,
		password,
	});
};

export const checkEmailVerificationCode = (email: string, code: string) => {
	return axios.post('/check_email_verification_code', {
		email,
		code,
	});
};
