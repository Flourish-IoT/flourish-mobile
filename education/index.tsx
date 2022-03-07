import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { educationTopics, useFeaturedPlants, useLearningCourses, useQuickTutorials } from '../data/education';
import ChipFilter from '../lib/components/ChipFilter';
import Empty from '../lib/components/Empty';
import Loading from '../lib/components/Loading';
import ScreenContainer from '../lib/components/ScreenContainer';
import SearchField from '../lib/components/SearchField';
import StyledButton from '../lib/components/styled/Button';
import Typography from '../lib/components/styled/Typography';
import { Theme } from '../providers/Theme';
import CourseCard from './components/CourseCard';
import FeaturedPlantCard from './components/FeaturedPlantCard';

export default function EducationScreenStack() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTopics, setSelectedTopics] = useState(educationTopics.map((name, index) => index));
	const { data: quickTutorials, isLoading: quickTutorialsIsLoading } = useQuickTutorials();
	const { data: learningCourses, isLoading: learningCoursesIsLoading } = useLearningCourses();
	const { data: featuredPlants, isLoading: featuredPlantsIsLoading } = useFeaturedPlants();

	return (
		<ScreenContainer scrolls style={styles.screenContainer}>
			<View style={styles.filterContainer}>
				<SearchField onQuery={setSearchQuery} />
			</View>

			<View style={styles.sectionTitle}>
				<Typography variant='heading2'>Topic</Typography>
				<StyledButton variant='text' title='View All' />
			</View>
			<ChipFilter
				showAllOption={false}
				items={educationTopics.map((name, index) => ({ name, index }))}
				selectedItems={selectedTopics}
				displayKey='name'
				valueKey='index'
				onFilterChange={setSelectedTopics}
				containerStyle={{ marginBottom: Theme.spacing.md }}
			/>

			<View style={styles.sectionTitle}>
				<Typography variant='heading2'>Quick Tutorials</Typography>
				<StyledButton variant='text' title='View All' />
			</View>

			<ScrollView style={styles.scrollContainer} horizontal>
				{learningCoursesIsLoading ? (
					<Loading animation='rings' />
				) : quickTutorials.length === 0 ? (
					<Empty text='Nothing came up.' />
				) : (
					quickTutorials.map((qt, index, { length }) => (
						<CourseCard
							key={String(index + qt.id)}
							cardData={qt}
							type='Tutorial'
							containerStyle={{ marginRight: index !== length - 1 ? Theme.spacing.md : 0 }}
						/>
					))
				)}
			</ScrollView>

			<View style={styles.sectionTitle}>
				<Typography variant='heading2'>Learning Course</Typography>
				<StyledButton variant='text' title='View All' />
			</View>

			<ScrollView style={styles.scrollContainer} horizontal>
				{learningCoursesIsLoading ? (
					<Loading animation='rings' />
				) : learningCourses.length === 0 ? (
					<Empty text='Nothing came up.' />
				) : (
					learningCourses.map((lc, index, { length }) => (
						<CourseCard
							key={String(index + lc.id)}
							cardData={lc}
							type='Course'
							containerStyle={{ marginRight: index !== length - 1 ? Theme.spacing.md : 0 }}
						/>
					))
				)}
			</ScrollView>

			<View style={styles.sectionTitle}>
				<Typography variant='heading2'>Popular Plants</Typography>
				<StyledButton variant='text' title='View All' />
			</View>

			<ScrollView style={{ ...styles.scrollContainer, marginBottom: 0 }} horizontal>
				{featuredPlantsIsLoading ? (
					<Loading animation='rings' />
				) : featuredPlants.length === 0 ? (
					<Empty text='Nothing came up.' />
				) : (
					featuredPlants.map((fp, fpIndex, { length }) => (
						<FeaturedPlantCard
							key={String(fpIndex + fp.id)}
							plant={fp}
							containerStyle={{ marginRight: fpIndex !== length - 1 ? Theme.spacing.md : 0 }}
						/>
					))
				)}
			</ScrollView>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		alignItems: 'flex-start',
		overflow: 'visible',
	},
	filterContainer: {
		marginBottom: Theme.spacing.md,
		width: '100%',
	},
	scrollContainer: {
		marginBottom: Theme.spacing.md,
		width: '100%',
		overflow: 'visible',
	},
	sectionTitle: {
		marginBottom: Theme.spacing.md,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
