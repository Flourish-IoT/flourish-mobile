import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { MetricRange, PlantMetric, useSinglePlant } from '../../../data/garden';
import AnimatedGauge from '../../../lib/components/AnimatedGauge';
import Typography from '../../../lib/components/styled/Typography';
import Chevron from '../../../lib/icons/Chevron';
import Sunlight from '../../../lib/icons/Sunlight';
import Temperature from '../../../lib/icons/Temperature';
import WaterDrop from '../../../lib/icons/WaterDrop';
import { getFullMetricName, getMetricGaugeColor, getMetricRangeDescription } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface MetricIconProps extends SvgProps {
	type: PlantMetric;
}

function MetricIcon({ type, ...rest }: MetricIconProps) {
	switch (type) {
		case 'Water':
			return <WaterDrop {...rest} />;
		case 'Sunlight':
			return <Sunlight {...rest} />;
		case 'Temperature':
			return <Temperature {...rest} />;
		case 'Humidity':
			// TODO: Need different icon for this
			return <WaterDrop {...rest} />;
	}
}

interface MetricVisualProps {
	mode: 'block' | 'listItem';
	metricType: PlantMetric;
	plantId: number;
	onPress?: () => void;
	containerStyle?: ViewStyle;
}

export default function MetricVisual({ mode, metricType, plantId, onPress, containerStyle }: MetricVisualProps) {
	const { data: plant, isLoading: plantIsLoading } = useSinglePlant('me', plantId);

	if (plantIsLoading || !plant) return null;
	const { sensorData, gaugeRatings } = plant;

	let sensorValue: number;
	let gaugeValue: MetricRange;

	switch (metricType) {
		case 'Water':
			sensorValue = sensorData.soilMoisture;
			gaugeValue = gaugeRatings.soilMoisture;
			break;
		case 'Sunlight':
			sensorValue = sensorData.light;
			gaugeValue = gaugeRatings.light;
			break;
		case 'Temperature':
			sensorValue = sensorData.temperature;
			gaugeValue = gaugeRatings.temperature;
			break;
		case 'Humidity':
			sensorValue = sensorData.humidity;
			gaugeValue = gaugeRatings.humidity;
			break;
	}

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
				<AnimatedGauge plantId={plant.id} type={metricType} newValue={gaugeValue} />
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
