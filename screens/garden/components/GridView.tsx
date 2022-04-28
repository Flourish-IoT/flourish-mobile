import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Plant } from '../../../data/garden';
import { Theme } from '../../../providers/Theme';
import PlantPot from './PlantPot';

interface GridViewProps {
	plants: Plant[];
	onPress: (plant: Plant) => void;
	style?: ViewStyle;
}

export default function GridView({ plants, onPress, style }: GridViewProps) {
	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', ...style }}>
			{plants.map((p, index, { length }) => {
				const isInLastRow = index === length - 1 || index === length - 2;

				return (
					<PlantPot
						viewMode={'Grid'}
						key={index + p.id}
						image={p.image}
						title={p.name}
						subtitle={p.scientificName}
						onPress={() => onPress(p)}
						containerStyle={{
							marginVertical: isInLastRow ? 0 : Theme.spacing.xl,
						}}
					/>
				);
			})}
		</View>
	);
}
