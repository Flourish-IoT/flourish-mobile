import React from 'react';
import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '../../../providers/Theme';

interface StyledTextInputProps {
	value?: string;
	onChangeText?: (input: string) => void;
	mode?: 'flat' | 'outlined';
	label?: string;
	error?: boolean;
	placeholder?: string;
	maxLength?: number;
	keyboardType?: KeyboardTypeOptions;
	disabled?: boolean;
	secureTextEntry?: boolean;
	left?: JSX.Element;
	right?: JSX.Element;
	style?: StyleProp<TextStyle>;
}

export default function StyledTextInput({
	value,
	onChangeText,
	mode,
	label,
	error,
	placeholder,
	maxLength,
	keyboardType,
	disabled,
	secureTextEntry,
	left,
	right,
	style,
	...rest
}: StyledTextInputProps) {
	return (
		<TextInput
			value={value}
			onChangeText={onChangeText}
			mode={mode}
			label={label}
			error={error}
			placeholder={placeholder}
			maxLength={maxLength}
			keyboardType={keyboardType}
			disabled={disabled}
			secureTextEntry={secureTextEntry}
			left={left}
			right={right}
			style={{ maxHeight: 64, width: '100%', backgroundColor: 'white', ...(style as object) }}
			underlineColor='transparent'
			placeholderTextColor={Theme.colors.text}
			{...rest}
		/>
	);
}
