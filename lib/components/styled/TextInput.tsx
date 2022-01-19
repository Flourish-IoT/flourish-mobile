import React from 'react';
import { TextInput } from 'react-native-paper';

export default function StyledTextInput(props) {
	return <TextInput {...props} style={{ maxHeight: 64, width: '100%', ...props.style }} />;
}
