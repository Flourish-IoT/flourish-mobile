import React from 'react';
import { NavigationProp } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import { PlantMetric, usePlantData } from '../../data/garden';
import ModalBackButton from '../../lib/components/ModalBackButton';
import ScreenContainer from '../../lib/components/ScreenContainer';
import MetricVisual from './components/MetricVisual';
import { StyleSheet, View } from 'react-native';
import Typography from '../../lib/components/styled/Typography';
import { Theme } from '../../providers/Theme';
import { getMetricGaugeColor, getMetricRangeDescription } from '../../lib/utils/helper';
import Loading from '../../lib/components/Loading';

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
	const { data: plantData, isLoading: plantDataIsLoading } = usePlantData(plantId);

	if (plantDataIsLoading) return <Loading animation='rings' size='lg' />;

	const getData = () => {
		switch (type) {
			case 'Water':
				return plantData.soilMoisture;
			case 'Sunlight':
				return plantData.light;
			case 'Temperature':
				return plantData.temperature;
			case 'Humidity':
				return plantData.humidity;
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
	},
	metricVisual: {
		transform: [{ scale: 1.5 }],
		marginRight: Theme.spacing.md,
	},
	metricTextContainer: {
		...Theme.util.flexCenter,
	},
});
