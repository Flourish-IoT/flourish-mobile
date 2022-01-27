import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { useTestEndpoint } from '../../data/common';
import Loading from '../../lib/components/Loading';
import Chevron from '../../lib/icons/Chevron';
import { Calendar } from 'react-native-calendars';
import { format, isAfter, isBefore, isFuture, addWeeks, isPast, isToday } from 'date-fns';
import { getMonthName, padString } from '../../lib/utils/helper';
import { Task, useTasks } from '../../data/calendar';
import TaskCard from './components/TaskCard';
import ChipFilter from '../../lib/components/ChipFilter';
import Empty from '../../lib/components/Empty';
import StyledModal from '../../lib/components/styled/Modal';
import ScreenContainer from '../../lib/components/ScreenContainer';
import { Theme } from '../../providers/Theme';
import StyledAccordion from '../../lib/components/styled/Accordion';

interface CalendarScreenProps {
	navigation: NavigationProp<ParamListBase>;
}

export type CalendarView = 'Month' | 'Week';
const calendarViews: CalendarView[] = ['Month', 'Week'];

export default function CalendarScreen({ navigation }: CalendarScreenProps) {
	const { data: plants, isLoading: plantsIsLoading } = useTestEndpoint();
	const { data: tasks, isLoading: tasksIsLoading } = useTasks();

	const [selectedInterval, setSelectedInterval] = useState<CalendarView>(calendarViews[0]);
	const [selectedDate, setSelectedDate] = useState<string | -1>(-1); // -1 meaning none
	const [calendarYear, setCalendarYear] = useState(format(new Date(), 'yyyy'));
	const [calendarMonth, setCalendarMonth] = useState(format(new Date(), 'MM'));
	const [selectedPlants, setSelectedPlants] = useState([-1]); // -1 meaning ALL
	const [viewSelectExpanded, setViewSelectExpanded] = useState(false);
	const [intervalTasksExpanded, setIntervalTasksExpanded] = useState(true);
	const [upcomingTasksExpanded, setUpcomingTasksExpanded] = useState(true);

	const handleSetSelectedView = (view: CalendarView) => {
		setSelectedInterval(view);
		setViewSelectExpanded(false);
	};

	if (plantsIsLoading || tasksIsLoading) return <Loading />;

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

	const upcomingTasks = plantFilteredTasks.filter((t) => isFuture(t.datetime) && isBefore(t.datetime, addWeeks(new Date(), 1)));

	let intervalTasks: Task[] = [];
	let intervalCategoryTitle = '';

	if (selectedInterval === 'Month') {
		intervalTasks = plantFilteredTasks.filter((t) => format(t.datetime, 'yyyy-MM') === calendarYear + '-' + calendarMonth);
		intervalCategoryTitle = getMonthName(Number(calendarMonth) - 1) + ' Tasks';
	} else if (selectedInterval === 'Week') {
		intervalTasks = intervalTasks.filter(
			(t) => isAfter(t.datetime, new Date('2022-01-20')) && isBefore(t.datetime, new Date('2022-01-26'))
		);
		intervalCategoryTitle = "This Week's Tasks";
	}

	const lateTasks = plantFilteredTasks.filter((t) => isPast(t.datetime) && !t.complete);
	const selectedDateTasks = intervalTasks.filter((t) => isToday(t.datetime));

	return (
		<ScreenContainer>
			<StyledAccordion
				title={selectedInterval}
				style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
				expanded={viewSelectExpanded}
				setExpanded={setViewSelectExpanded}
			>
				{calendarViews
					.filter((v) => v !== selectedInterval) // Hide the selected value
					.map((v) => (
						<List.Item key={v} title={v} onPress={() => handleSetSelectedView(v)} />
					))}
			</StyledAccordion>

			<ChipFilter
				showAllOption={true}
				canHaveNoneSelected={true}
				items={plants.map(({ name, id }) => ({ name, id }))}
				selectedItems={selectedPlants}
				displayKey='name'
				valueKey='id'
				onFilterChange={setSelectedPlants}
			/>

			<View>
				<Calendar
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
			</View>

			<View>
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
			</View>

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
