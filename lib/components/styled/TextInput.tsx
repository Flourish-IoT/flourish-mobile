import React from 'react';
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleProp, TextInputFocusEventData, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '../../../providers/Theme';

interface StyledTextInputProps {
	value?: string;
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
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
	onBlur,
	onFocus,
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
			returnKeyType='done'
			left={left}
			right={right}
			style={{ maxHeight: 64, width: '100%', backgroundColor: 'white', ...(style as object) }}
			underlineColor='transparent'
			placeholderTextColor={Theme.colors.text}
			onBlur={onBlur}
			onFocus={onFocus}
			{...rest}
		/>
	);
}
