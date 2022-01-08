import React from 'react';
import { ViewStyle, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RadioButtonProps {
	isSelected: boolean;
	onPress: () => void;
	style?: ViewStyle;
}

export default function RadioButton({ isSelected, onPress, style = {}, ...rest }: RadioButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				height: 24,
				width: 24,
				borderStyle: 'solid',
				borderColor: 'white',
				borderWidth: 10,
				borderRadius: 12,
				display: 'flex',
				backgroundColor: isSelected ? 'black' : 'white',
				...style,
			}}
			{...rest}
		/>
	);
}
