import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Plant, PlantMetric, useSinglePlant } from '../../../data/garden';
import AnimatedGauge from '../../../lib/components/AnimatedGauge';
import Typography from '../../../lib/components/styled/Typography';
import Chevron from '../../../lib/icons/Chevron';
import { getFullMetricName, getMetricGaugeColor, getMetricRangeDescription } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface MetricVisualProps {
	mode: 'block' | 'listItem';
	metricType: PlantMetric;
	plantId: number;
	onPress?: () => void;
	containerStyle?: ViewStyle;
}

const getSensorAndGaugeVals = (plant: Plant, metricType: PlantMetric) => {
	const sensorData = plant?.sensorData;
	const gaugeRatings = plant?.gaugeRatings;

	switch (metricType) {
		case 'Water':
			return { sensorValue: sensorData?.soilMoisture, gaugeValue: gaugeRatings?.soilMoisture };
		case 'Sunlight':
			return { sensorValue: sensorData?.light, gaugeValue: gaugeRatings?.light };
		case 'Temperature':
			return { sensorValue: sensorData?.temperature, gaugeValue: gaugeRatings?.temperature };
		case 'Humidity':
			return { sensorValue: sensorData?.humidity, gaugeValue: gaugeRatings?.humidity };
	}
};

export default function MetricVisual({ mode, metricType, plantId, onPress, containerStyle }: MetricVisualProps) {
	const { data: plant, isLoading: plantIsLoading } = useSinglePlant('me', plantId);
	const { sensorValue, gaugeValue } = getSensorAndGaugeVals(plant, metricType);

	if (plantIsLoading || !plant) return null;

	const styles = StyleSheet.create({
		container: {
			backgroundColor: mode === 'block' ? 'transparent' : Theme.colors.background,
			width: mode === 'block' ? 100 : '100%',
			flexDirection: mode === 'block' ? 'column' : 'row',
			justifyContent: mode === 'block' ? 'center' : 'space-between',
			alignItems: 'center',
			borderRadius: Theme.borderRadius,
			padding: Theme.spacing.sm,
			...containerStyle,
		},
		iconContainer: {
			height: mode === 'block' ? 80 : undefined,
			width: 70,
			alignItems: 'center',
			justifyContent: 'space-between',
			...(mode === 'listItem' && Theme.util.flexCenter),
		},
		textContainer: {
			flex: 1,
			paddingLeft: Theme.spacing.sm,
		},
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<AnimatedGauge type={metricType} newValue={gaugeValue} />
			</View>
			{mode === 'listItem' && (
				<View style={styles.textContainer}>
					<Typography variant='body' style={{ fontWeight: 'bold' }}>
						{getFullMetricName(metricType)}
						{': '}
						<Typography variant='h3bold' style={{ color: getMetricGaugeColor(gaugeValue) }}>
							{getMetricRangeDescription(gaugeValue)}
						</Typography>
					</Typography>
					<Typography variant='placeholder'>{sensorValue}</Typography>
				</View>
			)}
			{mode === 'listItem' && !!onPress && <Chevron direction='right' withBackground />}
		</TouchableOpacity>
	);
}
