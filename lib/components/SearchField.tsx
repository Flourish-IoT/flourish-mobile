import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import TextInput from './styled/TextInput';

interface SearchFieldProps {
	onQuery: (query: string) => void;
	style?: StyleProp<TextStyle>;
}

export default function SearchField({ onQuery, style, ...rest }: SearchFieldProps) {
	const styles = StyleSheet.create({
		input: {
			...(style as object),
		},
	});

	return <TextInput style={styles.input} mode='outlined' onChangeText={onQuery} placeholder='Search' {...rest} />;
}
