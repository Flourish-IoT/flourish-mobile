import { useQuery } from 'react-query';
import { AxiosInstance, mockEndpoint } from './api';

export const educationTags = ['Watering', 'Prune', 'Repot', 'Propogation'] as const;
export type EducationTag = typeof educationTags[number];

export interface FeaturedPlant {
	id: number;
	name: string;
	image: string | undefined;
}

export const useFeaturedPlants = () => {
	return useQuery(['education', 'featured-plants'], () => {
		const query = `/education/featured-plants`;
		mockEndpoint(250)
			.onGet(query)
			.replyOnce<FeaturedPlant[]>(200, [
				{ id: 1, name: 'Monstera', image: undefined },
				{ id: 2, name: 'Philodendron', image: undefined },
				{ id: 3, name: 'Bamboo', image: undefined },
			]);
		return AxiosInstance.get<FeaturedPlant[]>(query).then((res) => res.data);
	});
};

export interface Course {
	id: number;
	name: string;
	image: string | undefined;
	tags: EducationTag[];
}

export const useLearningCourses = () => {
	return useQuery(['education', 'learning-course'], () => {
		const query = `/education/learning-course`;
		mockEndpoint(250)
			.onGet(query)
			.replyOnce<Course[]>(200, [
				{
					id: 1,
					name: 'Learn the Plant Basics: Light, Water, Soil, etc.',
					tags: ['Watering', 'Prune', 'Repot', 'Propogation'],
					image: undefined,
				},
				{
					id: 2,
					name: '3 Superpowers: Prune, Repot, and Propagate',
					tags: ['Prune', 'Repot', 'Propogation'],
					image: undefined,
				},
			]);
		return AxiosInstance.get<Course[]>(query).then((res) => res.data);
	});
};

export interface Tutorial extends Course {
	data: string;
}

export const useQuickTutorials = () => {
	return useQuery(['education', 'quick-tutorial'], () => {
		const query = `/education/quick-tutorial`;
		mockEndpoint(250)
			.onGet(query)
			.replyOnce<Tutorial[]>(200, [
				{ id: 1, name: 'How to propagate 101: Beginner Tutorial', image: undefined, tags: ['Propogation'], data: '' },
				{ id: 2, name: 'Have a plant that you would like to repot?', image: undefined, tags: ['Repot'], data: '' },
			]);
		return AxiosInstance.get<Tutorial[]>(query).then((res) => res.data);
	});
};
