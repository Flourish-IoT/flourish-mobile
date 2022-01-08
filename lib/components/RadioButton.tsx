import React from 'react';
import { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RadioButtonProps {
	isSelected?: boolean;
	onPress: () => void;
	style?: ViewStyle;
}

export default function RadioButton({ isSelected, style, onPress }: RadioButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				height: 30,
				width: 30,
				borderStyle: 'solid',
				borderColor: '#e5e5e5',
				borderWidth: 5,
				borderRadius: 15,
				display: 'flex',
				backgroundColor: isSelected ? 'black' : 'white',
				...style,
			}}
		/>
	);
}
