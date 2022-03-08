import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { useLearningCourses } from '../data/education';
import Loading from '../lib/components/Loading';
import ScreenContainer from '../lib/components/ScreenContainer';
import { Theme } from '../providers/Theme';
import ModalBackButton from '../lib/components/ModalBackButton';
import { getPlaceHolder, padString } from '../lib/utils/helper';
import Typography from '../lib/components/styled/Typography';
import StyledButton from '../lib/components/styled/Button';
import Share from '../lib/icons/Share';
import Heart from '../lib/icons/Heart';
import Empty from '../lib/components/Empty';
import CourseCard from './components/CourseCard';
import StyledDivider from '../lib/components/styled/Divider';

interface SingleCourseProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface SingleCourseRouteProps {
	courseId: number;
}

export default function SingleCourse({ navigation, route }: SingleCourseProps) {
	const { courseId } = route.params as SingleCourseRouteProps;
	let { data: learningCourses, isLoading: learningCoursesIsLoading, isError: learningCoursesIsError } = useLearningCourses();

	if (learningCoursesIsLoading) return <Loading animation='rings' />;

	const course = learningCourses.find(({ id }) => id === courseId);

	const exploreMoreCourses = learningCourses.filter((c) => c.id !== course.id);

	return (
		<ScreenContainer scrolls style={styles.screenContainer}>
			<ModalBackButton absolutePos onPress={navigation.goBack} />
			<Image source={course.image ? { uri: course.image } : getPlaceHolder('plant')} style={styles.modalImage} />
			<View style={styles.content}>
				<Typography variant='placeholder'>Learning Course</Typography>
				<Typography variant='paragraph' style={styles.textNode}>
					{course.tags.map((t) => '#' + t + ' ')}
				</Typography>
				<Typography variant='h1' style={styles.title}>
					{course.name}
				</Typography>

				<StyledDivider style={styles.divider} />

				{course.data.map((node, index) => {
					const { type, value } = node;

					switch (type) {
						case 'h1':
						case 'h2':
						case 'h3bold':
						case 'h3':
						case 'body':
						case 'subHeader':
						case 'paragraph':
						case 'placeholder':
							return (
								<Typography key={index} variant={type} style={styles.textNode}>
									{value}
								</Typography>
							);
						case 'li':
							return (
								<Typography key={index} variant={type} style={styles.textNode}>
									{value}
								</Typography>
							);
						case 'step':
							const steps = course.data.filter(({ type: nodeType }) => nodeType === 'step');
							const stepIndex = steps.indexOf(node) + 1;

							return (
								<View key={index} style={{ ...styles.textNode, ...styles.stepNode }}>
									<Typography variant='h2' style={styles.stepNodeNumber}>
										{padString(stepIndex, 'left', 2, '0')}
									</Typography>
									<Typography variant='body' style={styles.stepNodeName}>
										{value}
									</Typography>
								</View>
							);
						case 'image':
							return (
								<Image
									key={index}
									source={value ? { uri: value } : getPlaceHolder('plant')}
									style={{ ...styles.textNode, ...styles.imageNode }}
								/>
							);
					}
				})}

				<StyledDivider style={styles.divider} />

				<Typography variant='h3bold' style={styles.textNode}>
					Explore More
				</Typography>
				<ScrollView style={styles.scrollContainer} horizontal>
					{learningCoursesIsLoading ? (
						<Loading animation='rings' />
					) : learningCoursesIsError ? (
						<Empty animation='error' text='There was an error getting the learning courses...' />
					) : exploreMoreCourses.length === 0 ? (
						<Empty size='lg' animation='magnifyingGlass' text='Nothing came up.' />
					) : (
						exploreMoreCourses.map((lc, index, { length }) => (
							<CourseCard
								key={String(index + lc.id)}
								cardData={lc}
								type='Course'
								containerStyle={{ marginRight: index !== length - 1 ? Theme.spacing.md : 0 }}
								onPress={() => navigation.navigate('SingleCourse', { courseId: lc.id })}
							/>
						))
					)}
				</ScrollView>
			</View>
			<View style={styles.actionItemsContainer}>
				<StyledButton
					variant='button'
					icon={<Share />}
					buttonStyle={{ marginRight: Theme.spacing.lg }}
					// onPress={() => {}} // TODO: Open shareable dialog
				/>
				<StyledButton
					variant='button'
					icon={<Heart />}
					// onPress={() => {}} // TODO: Add to favorites list
				/>
			</View>
		</ScreenContainer>
	);
}

const imageHeight = 275;

const styles = StyleSheet.create({
	screenContainer: {
		alignItems: 'flex-start',
		padding: 0,
	},
	modalImage: {
		width: '100%',
		height: imageHeight,
	},
	title: {},
	content: {
		width: '100%',
		minHeight: '100%',
		padding: Theme.spacing.screenContainer,
		paddingTop: Theme.spacing.xl,
		transform: [{ translateY: -25 }],
		backgroundColor: Theme.colors.background,
		borderTopLeftRadius: Theme.borderRadius * 3,
		borderTopRightRadius: Theme.borderRadius * 3,
		elevation: 2,
		zIndex: 2,
	},
	actionItemsContainer: {
		top: imageHeight - 45,
		paddingRight: 45 / 2,
		position: 'absolute',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		elevation: 3,
		zIndex: 3,
	},
	scrollContainer: {
		marginBottom: Theme.spacing.xl,
		width: '100%',
		overflow: 'visible',
	},
	textNode: {
		marginBottom: Theme.spacing.xl,
		width: '100%',
	},
	imageNode: {
		height: 230,
		borderRadius: Theme.borderRadius,
	},
	stepNode: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	stepNodeNumber: {
		color: Theme.colors.warning,
		marginRight: Theme.spacing.md,
	},
	stepNodeName: {},
	divider: {
		marginVertical: Theme.spacing.xl,
	},
});
