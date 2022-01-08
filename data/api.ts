import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const ApiUrl = 'https://f8rxwugjzj.execute-api.us-east-1.amazonaws.com/default';

export const mockEndpoint = (delay?: number) => {
	return new MockAdapter(axios, { delayResponse: delay ?? 0 });
};
