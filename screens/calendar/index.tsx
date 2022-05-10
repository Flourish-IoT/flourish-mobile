import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { usePlants } from '../../data/garden';
import Loading from '../../lib/components/animations/Loading';
import Chevron from '../../lib/icons/Chevron';
import { Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { padString } from '../../lib/utils/helper';
import { Task, useTasks } from '../../data/calendar';
import TaskCard from './components/TaskCard';
import ChipFilter from '../../lib/components/ChipFilter';
import Empty from '../../lib/components/animations/Empty';
import StyledModal from '../../lib/components/layout/Modal';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import { Theme } from '../../providers/Theme';
import StyledAccordion from '../../lib/components/layout/Accordion';
import DropDown from '../../lib/components/DropDown';
import {
	format,
	isAfter,
	isBefore,
	isFuture,
	isPast,
	addDays,
	subDays,
	isSameMonth,
	isSameWeek,
	startOfWeek,
	isSameDay,
} from 'date-fns';
import Typography from '../../lib/components/styled/Typography';

interface CalendarScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export const calendarViews = ['Month', 'Week', 'List'] as const;
export type CalendarView = typeof calendarViews[number];

export default function CalendarScreen({ navigation }: CalendarScreenProps) {
	const { data: plants, isLoading: plantsIsLoading } = usePlants('me');
	const { data: tasks, isLoading: tasksIsLoading } = useTasks('me');

	const [selectedInterval, setSelectedInterval] = useState<CalendarView>(calendarViews[0]);
	const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
	const [calendarYear, setCalendarYear] = useState(format(new Date(), 'yyyy'));
	const [calendarMonth, setCalendarMonth] = useState(format(new Date(), 'MM'));
	const [firstInCalendarWeek, setFirstInCalendarWeek] = useState(startOfWeek(new Date()));
	const [selectedPlants, setSelectedPlants] = useState([-1]); // -1 meaning ALL
	const [viewSelectExpanded, setViewSelectExpanded] = useState(false);
	const [intervalTasksExpanded, setIntervalTasksExpanded] = useState(true);
	const [upcomingTasksExpanded, setUpcomingTasksExpanded] = useState(true);

	if (plantsIsLoading || tasksIsLoading) return <Loading text='Gathering data...' />;

	const plantFilteredTasks = selectedPlants.includes(-1) ? tasks : tasks.filter((t) => selectedPlants.includes(t.plantId));
	const datesToHighlight = plantFilteredTasks.map((t) => format(t.datetime, 'yyyy-MM-dd'));
	const highlighted = datesToHighlight.reduce(
		(obj, date) => ((obj[date] = { marked: true, dotColor: Theme.colors.cta }), obj),
		{}
	);

	// Add the selected date to the marked dates obj
	highlighted[selectedDate] = {
		...highlighted[selectedDate],
		selected: true,
		selectedColor: Theme.colors.primary,
		dotColor: 'white',
	};

	// Add permanent highlight to today's date
	const todayFormatted = format(new Date(), 'yyyy-MM-dd');
	selectedDate !== todayFormatted &&
		(highlighted[todayFormatted] = {
			...highlighted[todayFormatted],
			selected: true,
			selectedColor: 'red',
			dotColor: 'white',
		});

	const upcomingTasks = plantFilteredTasks
		.filter((t) => !t.complete && isFuture(t.datetime) && isBefore(t.datetime, addDays(new Date(), 30)))
		// First 5 in the next 30 days
		.slice(0, 5);

	let intervalTasks: Task[] = [];

	if (selectedInterval === 'Month') {
		intervalTasks = plantFilteredTasks.filter((t) =>
			isSameMonth(t.datetime, new Date(`${calendarYear}-${calendarMonth}-01`))
		);
	} else if (selectedInterval === 'Week') {
		intervalTasks = intervalTasks.filter((t) => isSameWeek(t.datetime, firstInCalendarWeek));
	}

	const lateTasks = plantFilteredTasks
		.filter((t) => isPast(t.datetime) && !t.complete && isAfter(t.datetime, subDays(new Date(), 30)))
		// Last 5 in the passed 30 days
		.slice(1)
		.slice(-5);
	const selectedDateTasks = plantFilteredTasks.filter((t) =>
		isSameDay(new Date(selectedDate), new Date(format(t.datetime, 'yyyy-MM-dd')))
	);

	return (
		<ScreenContainer scrolls style={styles.screenContainer}>
			<DropDown
				title={selectedInterval}
				showAllOption={false}
				items={calendarViews.map((v, vIndex) => ({ display: v, value: vIndex }))}
				selectedItems={[calendarViews.indexOf(selectedInterval)]}
				onFilterChange={(views) => setSelectedInterval(calendarViews[views[0]])}
				displayKey='display'
				valueKey='value'
				expanded={viewSelectExpanded}
				setExpanded={setViewSelectExpanded}
			/>

			<ChipFilter
				showAllOption
				items={plants.map(({ name, id }) => ({ name, id }))}
				selectedItems={selectedPlants}
				displayKey='name'
				valueKey='id'
				onFilterChange={setSelectedPlants}
				containerStyle={{ marginVertical: Theme.spacing.md }}
			/>

			{selectedInterval === 'Month' && (
				<Calendar
					renderArrow={(direction) => <Chevron direction={direction} />}
					enableSwipeMonths={true}
					markedDates={highlighted}
					style={styles.calendarStyle}
					theme={{ calendarBackground: 'transparent' }}
					onPressArrowLeft={(subtractMonth) => subtractMonth()}
					onPressArrowRight={(addMonth) => addMonth()}
					onDayPress={(day) => {
						if (day.dateString === selectedDate) return;
						setSelectedDate(day.dateString);
					}}
					onMonthChange={(month) => {
						setCalendarYear(String(month.year));
						setCalendarMonth(padString(month.month, 'left', 2, '0'));
					}}
				/>
			)}

			{selectedInterval === 'List' && lateTasks.length > 0 && (
				<StyledAccordion
					title='Late Tasks'
					titleStyle={{ color: Theme.colors.error }}
					expanded={intervalTasksExpanded}
					setExpanded={setIntervalTasksExpanded}
				>
					{lateTasks.map((t, index, { length }) => (
						<TaskCard
							key={String(index + t.id)}
							task={t}
							containerStyle={{ marginBottom: index !== length - 1 ? Theme.spacing.sm : 0 }}
						/>
					))}
				</StyledAccordion>
			)}

			{selectedInterval === 'List' && (
				<StyledAccordion title='Upcoming Tasks' expanded={upcomingTasksExpanded} setExpanded={setUpcomingTasksExpanded}>
					{upcomingTasks.length > 0 ? (
						upcomingTasks.map((t, index, { length }) => (
							<TaskCard
								key={String(index + t.id)}
								task={t}
								containerStyle={{ marginBottom: index !== length - 1 ? Theme.spacing.sm : 0 }}
							/>
						))
					) : (
						<View style={{ height: 100 }}>
							<Empty animation='relax' text='No upcoming tasks!' />
						</View>
					)}
				</StyledAccordion>
			)}

			{selectedInterval === 'Month' && (
				<>
					<Typography variant='h3bold' style={{ marginBottom: Theme.spacing.md }}>
						{format(addDays(new Date(selectedDate), 1), 'MMMM do')}
						{/* Add 1 day because new Date() thinks day 01 is the 2nd of a month */}
					</Typography>
					{selectedDateTasks.length > 0 ? (
						selectedDateTasks.map((t, index, { length }) => (
							<TaskCard
								key={String(index + t.id)}
								task={t}
								containerStyle={{ marginBottom: index !== length - 1 ? Theme.spacing.sm : 0 }}
							/>
						))
					) : (
						<View style={{ width: '100%' }}>
							<Empty animation='relax' text='No tasks on this date.' size='lg' />
						</View>
					)}
				</>
			)}
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	screenContainer: {
		alignItems: 'flex-start',
	},
	calendarStyle: {
		width: Dimensions.get('window').width - Theme.spacing.md * 2,
		backgroundColor: 'transparent',
		marginBottom: Theme.spacing.md,
	},
});
