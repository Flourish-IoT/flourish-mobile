import { useQuery } from 'react-query';
import { OurFontName } from '../providers/Theme';
import { usePlants, usePlantTypes } from './garden';
import { useMe } from './user';
import { mockEndpoint, mockAxios } from '../providers/Axios';

export const educationTags = ['Watering', 'Prune', 'Repot', 'Propogation'] as const;
export type EducationTag = typeof educationTags[number];

export const useFeaturedPlants = () => {
	const { data: user } = useMe();

	const { data: plantTypes } = usePlantTypes();
	const { data: usersPlants } = usePlants('me');

	return useQuery(
		['education', 'featured-plants'],
		() => plantTypes.filter((p) => !usersPlants.map((uP) => uP.id).includes(p.id)),
		{
			enabled: !!user && !!usersPlants && !!plantTypes,
		}
	);
};

export interface Course {
	id: number;
	name: string;
	tags: EducationTag[];
	image: string | null;
	data?: CourseNode[];
}

export interface CourseNode {
	type: OurFontName | 'liTitle' | 'li' | 'step' | 'image';
	value: string;
}

export const tempLearningCourse: CourseNode[] = [
	{
		type: 'h2',
		value: 'When to Prune Houseplants',
	},
	{
		type: 'paragraph',
		value: 'Houseplants should typically be pruned at the beginning of the growing season, which is late winter or early spring for many varieties. However, woody indoor plants are an exception to this seasonal rule, requiring year-round pruning to remove dead leaves and branches.',
	},
	{
		type: 'paragraph',
		value: "A good rule of thumb for flowering species is to prune them just after they have finished flowering. If you prune right before they bloom, you'll be removing unopened buds that would otherwise turn into flowers.",
	},
	{
		type: 'image',
		value: '',
	},
	{
		type: 'h2',
		value: 'What You’ll Need',
	},
	{
		type: 'liTitle',
		value: 'Equipment / Tools',
	},
	{
		type: 'li',
		value: 'Pruning shears',
	},
	{
		type: 'li',
		value: 'Kitchen scissors',
	},
	{
		type: 'li',
		value: 'Gardening gloves (optional)',
	},
	{
		type: 'liTitle',
		value: 'Materials',
	},
	{
		type: 'li',
		value: 'Mature, overgrown houseplant',
	},
	{
		type: 'h2',
		value: 'Step-By-Step',
	},
	{
		type: 'step',
		value: 'Observe the Plant',
	},
	{
		type: 'paragraph',
		value: 'Take a step back from your houseplant, and look at its structure and shape. Notice whether it is growing spindly, looks fuller on one side, or contains any diseased or dying foliage. Also, check for areas of potential new growth, known as "latent buds." Buds typically occur where the leaf joins the plant stem.',
	},
	{
		type: 'image',
		value: '',
	},
	{
		type: 'step',
		value: 'Determine Your Tools',
	},
	{
		type: 'paragraph',
		value: "If the plant's branches are thick, such as those of an indoor tree, use pruning shears. If they are slender, kitchen scissors may give you a cleaner cut.",
	},
	{
		type: 'image',
		value: '',
	},
	{
		type: 'step',
		value: 'Start Clipping',
	},
	{
		type: 'paragraph',
		value: "Clip or pinch off dead leaves and stems. If stems have rotted at the root, pull them out, and make sure to let the soil dry out before the plant's next watering.",
	},
	{
		type: 'image',
		value: '',
	},
	{
		type: 'step',
		value: 'Deadhead the Plant',
	},
	{
		type: 'paragraph',
		value: "If you're working with a flowering houseplant, remove all spent flowers by pinching them off or clipping them back as close to the main stem as possible.",
	},
	{
		type: 'image',
		value: '',
	},
	{
		type: 'step',
		value: 'Make Your Cuts',
	},
	{
		type: 'paragraph',
		value: 'Make judicious cuts to encourage new growth. Cut just before a leaf node. Or when cutting back larger stems, cut as close to the main stem as possible. However, do not remove more than 25 percent of the plant.',
	},
	{
		type: 'image',
		value: '',
	},
	{
		type: 'h2',
		value: 'Houseplant Pruning Tips',
	},
	{
		type: 'paragraph',
		value: "Proper pruning requires an understanding of the plant's growth pattern. Plants grow from the tip down, meaning new growth emerges from the dominant bud at the end of a branch or stem.",
	},
	{
		type: 'paragraph',
		value: 'To prune a plant to encourage bushy new growth, snip off the dominant buds on select stems, staggering the cuts to encourage varied growth. Trim some branches back by a quarter, others by a half, and still others all the way back to their base. This way, when the plant leafs out again, the random growth pattern will fill it out.',
	},
	{
		type: 'paragraph',
		value: 'Deadheading is a type of pruning that simply involves removing any dead flowers. As a plant blooms, it puts energy into its flowers at the expense of new growth. Even as a flower is dying, it still consumes energy from the plant. So to prolong the blooming period and encourage healthy growth, deadheading is often necessary.',
	},
	{
		type: 'paragraph',
		value: "When pruning, cleanliness is important. Any cut made to a plant's tissue can expose it to disease. So keep your pruning instruments sharp, and clean and disinfect them between each use with a mild bleach-and-water solution.",
	},
	{
		type: 'paragraph',
		value: 'Most houseplant cuttings can be saved, rooted in a cup of water, and then planted to form new houseplants. Succulent clippings can even be propagated by planting them directly in a pot of soil and keeping it moist. After a few weeks, you should have new plants growing.',
	},
];

export const useLearningCourses = () => {
	return useQuery(['education', 'learning-course'], async () => {
		const query = `/education/learning-course`;
		mockEndpoint(200)
			.onGet(query)
			.replyOnce<Course[]>(200, [
				{
					id: 1,
					name: 'Learn the Plant Basics: Light, Water, Soil, etc.',
					tags: ['Watering', 'Prune', 'Repot', 'Propogation'],
					image: 'https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/Gardening-01.png?w=1155&h=646',
					data: tempLearningCourse,
				},
				{
					id: 2,
					name: '3 Superpowers: Prune, Repot, and Propagate',
					tags: ['Prune', 'Repot', 'Propogation'],
					image: 'https://www.modandmint.com/wp-content/uploads/2020/04/prune-propagate-fishbone-cactus-b.jpg',
					data: tempLearningCourse,
				},
			]);
		return (await mockAxios.get<Course[]>(query)).data;
	});
};

export interface Tutorial {
	id: number;
	name: string;
	tags: EducationTag[];
	link: string | undefined;
}

export const useQuickTutorials = () => {
	return useQuery(['education', 'quick-tutorial'], async () => {
		const query = `/education/quick-tutorial`;
		mockEndpoint(200)
			.onGet(query)
			.replyOnce<Tutorial[]>(200, [
				{
					id: 1,
					name: 'How to propagate 101: Beginner Tutorial',
					tags: ['Propogation'],
					link: 'https://www.youtube.com/embed/Jh5oX0VRnzk',
				},
				{
					id: 2,
					name: 'Have a plant that you would like to repot?',
					tags: ['Repot'],
					link: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
				},
			]);
		return (await mockAxios.get<Tutorial[]>(query)).data;
	});
};
