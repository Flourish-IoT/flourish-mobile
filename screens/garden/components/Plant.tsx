import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { ViewMode } from '..';

interface PlantProps {
	viewMode: ViewMode;
	plantName: any;
	image?: any;
}

export default function Plant({ viewMode, plantName, image }: PlantProps) {
	return (
		<View
			style={{
				width: 200,
				height: 200,
			}}
		>
			<View>
				<Image
					source={image ? { url: image } : require('../../../lib/assets/placeholder/plant.png')}
					style={{ height: '100%', width: '100%' }}
				/>
			</View>
			<View>
				<Text>{viewMode === 'Grid' ? plantName : ''}</Text>
			</View>
		</View>
	);
}
