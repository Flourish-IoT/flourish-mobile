import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { educationTags, useFeaturedPlants, useLearningCourses, useQuickTutorials } from '../data/education';
import ChipFilter from '../lib/components/ChipFilter';
import Empty from '../lib/components/Empty';
import Loading from '../lib/components/Loading';
import ScreenContainer from '../lib/components/ScreenContainer';
import SearchField from '../lib/components/SearchField';
import StyledButton from '../lib/components/styled/Button';
import Typography from '../lib/components/styled/Typography';
import { arrayHasInCommon, filterData } from '../lib/utils/helper';
import { Theme } from '../providers/Theme';
import CourseCard from './components/CourseCard';
import FeaturedPlantCard from './components/FeaturedPlantCard';

export default function EducationScreenStack() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState(educationTags.map((name, index) => index));
	let { data: quickTutorials, isLoading: quickTutorialsIsLoading, isError: quickTutorialsIsError } = useQuickTutorials();
	let { data: learningCourses, isLoading: learningCoursesIsLoading, isError: learningCoursesIsError } = useLearningCourses();
	let { data: featuredPlants, isLoading: featuredPlantsIsLoading, isError: featuredPlantsIsError } = useFeaturedPlants();

	const didSearch = searchQuery.trim().length !== 0;
	if (didSearch) {
		quickTutorials = filterData(quickTutorials, searchQuery);
		learningCourses = filterData(learningCourses, searchQuery);
		featuredPlants = filterData(featuredPlants, searchQuery);
	}

	const didChangeTags = selectedTags.length !== educationTags.length;
	if (didChangeTags) {
		quickTutorials = quickTutorials.filter((tut) =>
			arrayHasInCommon(
				tut.tags,
				selectedTags.map((st) => educationTags[st])
			)
		);
		learningCourses = learningCourses.filter((tut) =>
			arrayHasInCommon(
				tut.tags,
				selectedTags.map((st) => educationTags[st])
			)
		);
	}

	let emptyResultText = 'Nothing came up.';
	if (didSearch || didChangeTags) emptyResultText = emptyResultText + ' Please check your filters.';

	return (
		<ScreenContainer scrolls style={styles.screenContainer}>
			<View style={styles.filterContainer}>
				<SearchField onQuery={setSearchQuery} />
			</View>

			<View style={styles.sectionTitle}>
				<Typography variant='h2'>Topic</Typography>
			</View>
			<ChipFilter
				showAllOption={false}
				canHaveNoneSelected
				items={educationTags.map((name, index) => ({ name, index }))}
				selectedItems={selectedTags}
				displayKey='name'
				valueKey='index'
				onFilterChange={setSelectedTags}
				containerStyle={styles.chipFilter}
			/>

			<View style={styles.sectionTitle}>
				<Typography variant='h2'>Quick Tutorials</Typography>
				<StyledButton disabled={quickTutorials.length === 0} variant='text' title='View All' />
			</View>

			<ScrollView style={styles.scrollContainer} horizontal>
				{quickTutorialsIsLoading ? (
					<Loading animation='rings' />
				) : quickTutorialsIsError ? (
					<Empty animation='error' text='There was an error getting the quick tutorials...' />
				) : quickTutorials.length === 0 ? (
					<Empty size='lg' animation='magnifyingGlass' text={emptyResultText} />
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
				<Typography variant='h2'>Learning Course</Typography>
				<StyledButton disabled={learningCourses.length === 0} variant='text' title='View All' />
			</View>

			<ScrollView style={styles.scrollContainer} horizontal>
				{learningCoursesIsLoading ? (
					<Loading animation='rings' />
				) : learningCoursesIsError ? (
					<Empty animation='error' text='There was an error getting the learning courses...' />
				) : learningCourses.length === 0 ? (
					<Empty size='lg' animation='magnifyingGlass' text={emptyResultText} />
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
				<Typography variant='h2'>Popular Plants</Typography>
				<StyledButton disabled={featuredPlants.length === 0} variant='text' title='View All' />
			</View>

			<ScrollView style={{ ...styles.scrollContainer, marginBottom: 0 }} horizontal>
				{featuredPlantsIsLoading ? (
					<Loading animation='rings' />
				) : featuredPlantsIsError ? (
					<Empty animation='error' text='There was an error getting the popular plants...' />
				) : featuredPlants.length === 0 ? (
					<Empty size='lg' animation='magnifyingGlass' text={emptyResultText} />
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
	chipFilter: {
		marginBottom: Theme.spacing.xl,
	},
	scrollContainer: {
		marginBottom: Theme.spacing.xl,
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
