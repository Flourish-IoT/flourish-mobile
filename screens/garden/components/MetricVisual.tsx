import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';
import { MetricRange } from '../../../data/garden';
import Chevron from '../../../lib/icons/Chevron';
import Sunlight from '../../../lib/icons/Sunlight';
import Temperature from '../../../lib/icons/Temperature';
import WaterDrop from '../../../lib/icons/WaterDrop';
import { Theme } from '../../../providers/Theme';
import { PlantMetric } from './CarouselView';

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
	type: PlantMetric;
	range: MetricRange | undefined;
	rawValue: number;
	onPress: () => void;
}

export default function MetricVisual({ mode, type, range, rawValue, onPress }: MetricVisualProps) {
	const blocks = [
		{ range: 1, color: '#DADADA' },
		{ range: 2, color: '#B0B0B0' },
		{ range: 3, color: '#6B6B6B' },
		{ range: 4, color: '#B0B0B0' },
		{ range: 5, color: '#DADADA' },
	];

	const styles = StyleSheet.create({
		container: {
			width: mode === 'block' ? 100 : Dimensions.get('window').width,
			display: 'flex',
			flexDirection: mode === 'block' ? 'column' : 'row',
			justifyContent: mode === 'block' ? 'center' : 'space-between',
			alignItems: 'center',
			padding: Theme.padding,
		},
		iconContainer: {
			height: 50,
			width: undefined,
			aspectRatio: 1 / 1,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: mode === 'block' ? Theme.margin : 0,
		},
		materBar: {
			width: mode === 'block' ? '100%' : 100,
			display: 'flex',
			flexDirection: 'row',
		},
		meterBarBlock: {
			width: 100 / blocks.length + '%',
			height: undefined,
			aspectRatio: 1 / 1,
		},
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<MetricIcon type={type} height={mode === 'block' ? 50 : 40} />
			</View>
			{mode === 'listItem' && <Text>{rawValue}</Text>}
			<View style={styles.materBar}>
				{blocks.map((b) => (
					<View
						key={b.range}
						style={{ ...styles.meterBarBlock, backgroundColor: b.color, borderWidth: b.range === range ? 2 : 0 }}
					/>
				))}
			</View>
			{mode === 'listItem' && <Chevron direction='right' />}
		</TouchableOpacity>
	);
}
