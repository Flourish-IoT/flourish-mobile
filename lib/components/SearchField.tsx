import React from 'react';
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInputFocusEventData, TextStyle, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '../../providers/Theme';
import StyledTextInput from './styled/TextInput';

interface SearchFieldProps {
	onQuery: (query: string) => void;
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	containerStyle?: StyleProp<TextStyle>;
	inputStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
}

export default function SearchField({
	onQuery,
	containerStyle,
	inputStyle,
	onBlur,
	onFocus,
	disabled = false,
	...rest
}: SearchFieldProps) {
	const styles = StyleSheet.create({
		container: {
			opacity: disabled ? Theme.disabledOpacity : 1,
			...Theme.shadow,
			...(containerStyle as object),
		},
		input: {
			height: 35,
			borderRadius: Theme.borderRadius,
			borderTopLeftRadius: Theme.borderRadius,
			borderTopRightRadius: Theme.borderRadius,
			overflow: 'hidden',
			...(inputStyle as object),
		},
	});

	return (
		<View style={styles.container}>
			<StyledTextInput
				style={styles.input}
				onChangeText={onQuery}
				placeholder='Search'
				left={<TextInput.Icon name='magnify' color={Theme.colors.primary} />}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				{...rest}
			/>
		</View>
	);
}
