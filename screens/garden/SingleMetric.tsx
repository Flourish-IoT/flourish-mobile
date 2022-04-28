import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import { PlantMetric, useSinglePlant } from '../../data/garden';
import ModalBackButton from '../../lib/components/ModalBackButton';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import MetricVisual from './components/MetricVisual';
import { Dimensions, StyleSheet, View } from 'react-native';
import Typography from '../../lib/components/styled/Typography';
import { Theme } from '../../providers/Theme';
import { getMetricGaugeColor, getMetricRangeDescription } from '../../lib/utils/helper';
import Loading from '../../lib/components/Loading';

import { BarChart } from 'react-native-chart-kit';

interface SingleMetricScreenProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface SingleMetricScreenRouteProps {
	plantId: number;
	type: PlantMetric;
}

export default function SingleMetricScreen({ navigation, route }: SingleMetricScreenProps) {
	const { plantId, type } = route.params as SingleMetricScreenRouteProps;
	const { data: plant, isLoading: plantDataIsLoading } = useSinglePlant('me', plantId);

	if (plantDataIsLoading) return <Loading animation='rings' size='lg' />;

	const getData = () => {
		switch (type) {
			case 'Water':
				return { range: plant.gaugeRatings.soilMoisture, raw: plant.sensorData.soilMoisture };
			case 'Sunlight':
				return { range: plant.gaugeRatings.light, raw: plant.sensorData.light };
			case 'Temperature':
				return { range: plant.gaugeRatings.temperature, raw: plant.sensorData.temperature };
			case 'Humidity':
				return { range: plant.gaugeRatings.humidity, raw: plant.sensorData.humidity };
		}
	};

	return (
		<ScreenContainer scrolls>
			<View style={styles.header}>
				<ModalBackButton absolutePos={false} onPress={navigation.goBack} style={styles.backButton} />
				<Typography variant='h1'>{type}</Typography>
			</View>
			<View style={styles.metricVisualContainer}>
				<MetricVisual mode='block' metricType={type} plantId={plantId} containerStyle={styles.metricVisual} />
				<View style={styles.metricTextContainer}>
					<Typography variant='h1'>{getData().raw}</Typography>
					<Typography variant='h3bold' style={{ color: getMetricGaugeColor(getData().range) }}>
						{getMetricRangeDescription(getData().range)}
					</Typography>
				</View>
			</View>
			<View
				style={
					{
						// backgroundColor: Theme.colors.background,
					}
				}
			>
				<BarChart
					style={
						{
							// backgroundColor: Theme.colors.background,
						}
					}
					data={{
						labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
						datasets: [
							{
								data: [50, 40, 20, 30, 50, 43],
							},
						],
					}}
					width={Dimensions.get('window').width - Theme.spacing.md * 2}
					height={220}
					yAxisSuffix='%'
					yAxisLabel=''
					chartConfig={{
						backgroundGradientFromOpacity: 0,
						backgroundGradientToOpacity: 0,
						fillShadowGradientOpacity: 1,
						color: () => '#015669',
						labelColor: () => Theme.colors.text,
						barPercentage: 0.5,
						barRadius: 5,
						decimalPlaces: 0,
					}}
				/>
			</View>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: Theme.spacing.lg * 3,
	},
	backButton: {
		marginRight: Theme.spacing.screenContainer,
	},
	metricVisualContainer: {
		flexDirection: 'row',
		marginBottom: Theme.spacing.lg,
	},
	metricVisual: {
		transform: [{ scale: 1.5 }],
		marginRight: Theme.spacing.md,
	},
	metricTextContainer: {
		...Theme.util.flexCenter,
	},
});
