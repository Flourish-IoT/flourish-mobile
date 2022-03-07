import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { usePlants } from '../../data/garden';
import Loading from '../../lib/components/Loading';
import Chevron from '../../lib/icons/Chevron';
import { Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { padString } from '../../lib/utils/helper';
import { Task, useTasks } from '../../data/calendar';
import TaskCard from './components/TaskCard';
import ChipFilter from '../../lib/components/ChipFilter';
import Empty from '../../lib/components/Empty';
import StyledModal from '../../lib/components/styled/Modal';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { Theme } from '../../providers/Theme';
import StyledAccordion from '../../lib/components/styled/Accordion';
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

interface CalendarScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export type CalendarView = 'Month' | 'Week';
const calendarViews: CalendarView[] = ['Month', 'Week'];

export default function CalendarScreen({ navigation }: CalendarScreenProps) {
	const { data: plants, isLoading: plantsIsLoading } = usePlants('me');
	const { data: tasks, isLoading: tasksIsLoading } = useTasks('me');

	const [selectedInterval, setSelectedInterval] = useState<CalendarView>(calendarViews[0]);
	const [selectedDate, setSelectedDate] = useState<string | -1>(-1); // -1 meaning none
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

	// If a date is selected, add it to the marked dates obj
	selectedDate !== -1 &&
		(highlighted[selectedDate] = {
			...highlighted[selectedDate],
			selected: true,
			selectedColor: Theme.colors.primary,
			dotColor: 'white',
		});
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
		<ScreenContainer scrolls style={{ alignItems: 'flex-start' }}>
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

			<Calendar
				style={styles.calendarStyle}
				theme={{ calendarBackground: 'transparent' }}
				onDayPress={(day) => {
					setSelectedDate(day.dateString === selectedDate ? -1 : day.dateString);
				}}
				onMonthChange={(month) => {
					setCalendarYear(String(month.year));
					setCalendarMonth(padString(month.month, 'left', 2, '0'));
				}}
				renderArrow={(direction) => <Chevron direction={direction} />}
				onPressArrowLeft={(subtractMonth) => subtractMonth()}
				onPressArrowRight={(addMonth) => addMonth()}
				enableSwipeMonths={true}
				markedDates={highlighted}
			/>

			{lateTasks.length > 0 && (
				<StyledAccordion
					title='Late Tasks'
					titleStyle={{ color: Theme.colors.error }}
					expanded={intervalTasksExpanded}
					setExpanded={setIntervalTasksExpanded}
				>
					{lateTasks.map((t, index, { length }) => (
						<TaskCard
							key={t.id}
							task={t}
							containerStyle={{ marginBottom: index !== length - 1 ? Theme.spacing.sm : 0 }}
						/>
					))}
				</StyledAccordion>
			)}

			<StyledAccordion title='Upcoming Tasks' expanded={upcomingTasksExpanded} setExpanded={setUpcomingTasksExpanded}>
				{upcomingTasks.length > 0 ? (
					upcomingTasks.map((t, index, { length }) => (
						<TaskCard
							key={t.id}
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

			<StyledModal
				height='50%'
				visible={selectedDate !== -1}
				onClose={() => setSelectedDate(-1)}
				title={format(addDays(new Date(selectedDate), 1), 'MMMM do')} // Add 1 day because new Date() thinks day 01 is the 2nd of a month
				content={
					<>
						{selectedDateTasks.length > 0 ? (
							selectedDateTasks.map((t, index, { length }) => (
								<TaskCard
									key={t.id}
									task={t}
									containerStyle={{ marginBottom: index !== length - 1 ? Theme.spacing.sm : 0 }}
								/>
							))
						) : (
							<View style={{ height: '50%' }}>
								<Empty animation='relax' text='No tasks on this date.' />
							</View>
						)}
					</>
				}
			/>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	calendarStyle: {
		// TODO: Figure out why '100%' doesn't work
		width: Dimensions.get('window').width - Theme.spacing.md * 2,
		backgroundColor: 'transparent',
		marginBottom: Theme.spacing.md,
	},
});
