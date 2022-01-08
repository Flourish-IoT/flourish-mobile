import axios from 'axios';
import { mockEndpoint } from './api';

export const sendEmailVerificationCode = (email: string, password: string) => {
	mockEndpoint(0).onPost('/send_email_verification_code', { params: { email, password } }).reply(200, true);
	return axios.post('/send_email_verification_code', { params: { email, password } });
};

export const checkEmailVerificationCode = (email: string, code: string) => {
	mockEndpoint(100)
		.onPost('/check_email_verification_code', { params: { email, code } })
		.reply(code === '2022' ? 200 : 403, true);
	return axios.post('/check_email_verification_code', { params: { email, code } });
};
