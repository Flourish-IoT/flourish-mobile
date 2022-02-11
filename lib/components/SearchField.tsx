import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Theme } from '../../providers/Theme';
import SegmentedList from './styled/SegmentedList';
import StyledTextInput from './styled/TextInput';

interface SearchFieldProps {
	onQuery: (query: string) => void;
	style?: StyleProp<TextStyle>;
}

export default function SearchField({ onQuery, style, ...rest }: SearchFieldProps) {
	const styles = StyleSheet.create({
		input: {
			height: 35,
			borderRadius: Theme.borderRadius,
			borderTopLeftRadius: Theme.borderRadius,
			borderTopRightRadius: Theme.borderRadius,
			...Theme.shadow,
			...(style as object),
		},
	});

	return (
		<StyledTextInput
			style={styles.input}
			onChangeText={onQuery}
			placeholder='Search'
			left={<TextInput.Icon name='magnify' color={Theme.colors.primary} />}
			{...rest}
		/>
	);
}
