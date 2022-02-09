import React from 'react';
import Svg, { SvgProps, Path, Defs, G, Circle, ClipPath } from 'react-native-svg';
import { MetricRange, PlantMetric } from '../../data/garden';

export type MeasurementsIconVariant = 'face' | 'plain';

export interface MeasurementsIconProps extends SvgProps {
	type: PlantMetric;
	range: MetricRange | undefined;
}

export default function MeasurementsProps({ type, range, ...rest }: MeasurementsIconProps) {
	switch (type) {
		case 'Water':
			switch (range) {
				case 1:
					return null;
				case 2:
					return null;
				case 3:
					return null;
				case 4:
					return null;
				case 5:
					return null;
				case undefined:
					return null;
			}
		default:
			return null;
		case 'Temperature':
			switch (range) {
				case 1:
					return null;
				case 2:
					return null;
				case 3:
					return null;
				case 4:
					return null;
				case 5:
					return null;
				case undefined:
					return null;
			}
		case 'Sunlight':
			switch (range) {
				case 1:
					return null;
				case 2:
					return null;
				case 3:
					return null;
				case 4:
					return null;
				case 5:
					return null;
				case undefined:
					return null;
			}
		case 'Humidity':
			switch (range) {
				case 1:
					return null;
				case 2:
					return null;
				case 3:
					return null;
				case 4:
					return null;
				case 5:
					return null;
				case undefined:
					return null;
			}
	}
}
