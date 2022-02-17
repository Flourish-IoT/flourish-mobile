import { NavigationProp } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import { useLayoutEffect } from 'react';
import { PlantMetric } from '../../data/garden';
import ScreenContainer from '../../lib/components/ScreenContainer';
import MetricVisual from './components/MetricVisual';

interface SingleMetricScreenProps {
	navigation: NavigationProp<ParamListBase>;
	route: RouteProp<ParamListBase>;
}

interface SinglePlantScreenRouteProps {
	plantId: number;
	type: PlantMetric;
}

export default function SingleMetricScreen({ navigation, route }: SingleMetricScreenProps) {
	const { plantId, type } = route.params as SinglePlantScreenRouteProps;

	useLayoutEffect(() => {
		navigation.setOptions({ title: type });
	}, []);

	return (
		<ScreenContainer scrolls>
			<MetricVisual mode='listItem' metricType={type} plantId={plantId} />
		</ScreenContainer>
	);
}
