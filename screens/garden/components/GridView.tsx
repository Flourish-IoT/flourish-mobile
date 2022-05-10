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
			{plants.map((p, index) => {
				const isFirstRow = index === 0 || index === 1;

				return (
					<View key={index + p.id} style={{ width: '50%' }}>
						<PlantPot
							viewMode={'Grid'}
							image={p.image}
							title={p.name}
							subtitle={p.plantType.scientificName}
							onPress={() => onPress(p)}
							containerStyle={{
								width: '100%',
								marginTop: isFirstRow ? 0 : Theme.spacing.xl,
							}}
						/>
					</View>
				);
			})}
		</View>
	);
}
