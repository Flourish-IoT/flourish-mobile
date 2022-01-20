import { useMutation } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';
import { useUser } from './auth';

export type ConfidenceRating = 1 | 2 | 3;

export const getConfidenceText = (rating: ConfidenceRating) => {
	switch (rating) {
		case 1:
			return 'Low';
		case 2:
			return 'Medium';
		case 3:
			return 'High';
	}
};

export const useChangeUsername = () => {
	const user = useUser();
	const query = `/users/${user.id}/`;

	mockEndpoint(500).onPut(query).reply<string>(200, 'OK');
	return useMutation((newUsername: string) => AxiosInstance.put(query, { params: { newUsername } }));
};

export const useChangePassword = () => {
	const user = useUser();
	const query = `/users/${user.id}/`;

	mockEndpoint(500).onPut(query).reply<string>(200, 'OK');
	return useMutation((newPassword: string) => AxiosInstance.put(query, { params: { newPassword } }));
};

export const useDeleteAccount = () => {
	const user = useUser();
	const query = `/users/${user.id}/`;

	mockEndpoint(500).onDelete(query).reply<string>(200, 'OK');
	return useMutation((currentPassword: string) => AxiosInstance.delete(query, { params: { currentPassword } }));
};
