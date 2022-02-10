import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { usePlants } from '../../data/garden';
import Loading from '../../lib/components/Loading';
import Chevron from '../../lib/icons/Chevron';
import { Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
	format,
	isAfter,
	isBefore,
	isFuture,
	addWeeks,
	isPast,
	isToday,
	addDays,
	subDays,
	isSameMonth,
	isSameWeek,
	endOfWeek,
	startOfWeek,
	isSameDay,
} from 'date-fns';
import { getMonthName, padString } from '../../lib/utils/helper';
import { Task, useTasks } from '../../data/calendar';
import TaskCard from './components/TaskCard';
import ChipFilter from '../../lib/components/ChipFilter';
import Empty from '../../lib/components/Empty';
import StyledModal from '../../lib/components/styled/Modal';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { Theme } from '../../providers/Theme';
import StyledAccordion from '../../lib/components/styled/Accordion';
import DropDown from '../../lib/components/DropDown';

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
	const highlighted = datesToHighlight.reduce((obj, date) => ((obj[date] = { marked: true }), obj), {});

	// If a date is selected, add it to the marked dates obj
	selectedDate !== -1 && (highlighted[selectedDate] = { ...highlighted[selectedDate], selected: true });
	// Add permanent highlight to today's date
	const todayFormatted = format(new Date(), 'yyyy-MM-dd');
	selectedDate !== todayFormatted &&
		(highlighted[todayFormatted] = {
			...highlighted[todayFormatted],
			selected: true,
			selectedColor: 'red',
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
	const selectedDateTasks = plantFilteredTasks.filter((t) => isSameDay(new Date(selectedDate), t.datetime));

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
				style={{ marginVertical: Theme.spacing.md }}
			/>

			<Calendar
				style={styles.calendarStyle}
				theme={styles.calendarTheme}
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
					{lateTasks.map((t) => (
						<TaskCard key={t.id} task={t} />
					))}
				</StyledAccordion>
			)}

			<StyledAccordion title='Upcoming Tasks' expanded={upcomingTasksExpanded} setExpanded={setUpcomingTasksExpanded}>
				{upcomingTasks.length > 0 ? (
					upcomingTasks.map((t) => <TaskCard key={t.id} task={t} />)
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
				title={format(new Date(selectedDate), 'MMMM do')}
				content={
					<>
						{selectedDateTasks.length > 0 ? (
							selectedDateTasks.map((t, index) => <TaskCard key={index + String(t.id)} task={t} />)
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
	calendarTheme: {
		backgroundColor: 'transparent',
	},
});
