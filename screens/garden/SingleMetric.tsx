import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import { Plant, PlantMetric, useSinglePlant } from '../../data/garden';
import ModalBackButton from '../../lib/components/ModalBackButton';
import ScreenContainer from '../../lib/components/layout/ScreenContainer';
import MetricVisual from './components/MetricVisual';
import { Dimensions, StyleSheet, View } from 'react-native';
import Typography from '../../lib/components/styled/Typography';
import { Theme } from '../../providers/Theme';
import { getGaugeValueColor, getGaugeValuePhrase, getMetricUnitSuffix, usePlantTypeBestRange } from '../../lib/utils/helper';
import Loading from '../../lib/components/animations/Loading';

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
	const { data: bestRange } = usePlantTypeBestRange(plant?.plantType?.id, type);

	if (plantDataIsLoading) return <Loading animation='rings' size='lg' />;

	const data = getData(type, plant);

	return (
		<ScreenContainer scrolls style={styles.screenContainerStyle}>
			<View style={styles.header}>
				<ModalBackButton absolutePos={false} onPress={navigation.goBack} style={styles.backButton} />
				<Typography variant='h1'>{type}</Typography>
			</View>
			<View style={styles.metricVisualContainer}>
				<MetricVisual
					mode='block'
					metricType={type}
					plantId={plantId}
					showBlockGaugePhrase={false}
					containerStyle={styles.metricVisual}
				/>
				<View style={styles.metricTextContainer}>
					<Typography variant='h1'>{data.sensorVal + getMetricUnitSuffix(type)}</Typography>
					<Typography variant='h2' style={{ color: getGaugeValueColor(data.gaugeVal) }}>
						{getGaugeValuePhrase(data.gaugeVal)}
					</Typography>
				</View>
			</View>

			<View style={styles.bestRangeContainer}>
				<Typography variant='paragraph'>Best Range: </Typography>
				<Typography variant='h3bold'>{bestRange}</Typography>
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
	screenContainerStyle: {
		backgroundColor: 'white',
	},
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
		width: 90,
		marginRight: Theme.spacing.lg,
	},
	metricTextContainer: {
		...Theme.util.flexCenter,
	},
	bestRangeContainer: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		backgroundColor: Theme.colors.background,
		borderRadius: Theme.borderRadius,
		marginVertical: Theme.spacing.md,
		...Theme.util.flexCenter,
	},
});

const getData = (type: PlantMetric, plant: Plant) => {
	const gaugeRatings = plant.gaugeRatings;
	const sensorData = plant.sensorData;

	switch (type) {
		case 'Water':
			return {
				gaugeVal: gaugeRatings?.soilMoisture,
				sensorVal: sensorData?.soilMoisture,
			};
		case 'Sunlight':
			return {
				gaugeVal: gaugeRatings?.light,
				sensorVal: sensorData?.light,
			};
		case 'Temperature':
			return {
				gaugeVal: gaugeRatings?.temperature,
				sensorVal: sensorData?.temperature,
			};
		case 'Humidity':
			return {
				gaugeVal: gaugeRatings?.humidity,
				sensorVal: sensorData?.humidity,
			};
	}
};
