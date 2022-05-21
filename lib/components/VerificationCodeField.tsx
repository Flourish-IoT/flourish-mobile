import React, { useRef, useState, LegacyRef } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputKeyPressEventData, View, ViewStyle } from 'react-native';
import { Theme } from '../../providers/Theme';

interface VerificationCodeFieldProps {
	onInput: (newValues: string[]) => void;
	values: string[];
	disabled?: boolean;
	containerStyle?: ViewStyle;
}

const numberOfSlots = 4;

export default function VerificationCodeField({ onInput, values, disabled = false, containerStyle }: VerificationCodeFieldProps) {
	const [focusedInput, setFocusedInput] = useState<number>();
	const refs: LegacyRef<TextInput>[] = [useRef(), useRef(), useRef(), useRef()];

	const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
		const key = e.nativeEvent.key;

		// @ts-ignore: .current is a valid property
		const input = refs[index].current;
		// @ts-ignore: .current is a valid property
		const nextInput = refs[index + 1]?.current;
		// @ts-ignore: .current is a valid property
		const lastInput = refs[index - 1]?.current;

		if (key === 'Backspace') {
			index !== 0 && lastInput.focus();
		} else {
			index === numberOfSlots - 1 ? input.blur() : nextInput.focus();
		}
	};

	const onChange = (index: number, value: string) => {
		let newValues = [...values];
		newValues[index] = value;
		onInput(newValues);
	};

	return (
		<View style={{ ...styles.container, ...containerStyle }}>
			{[...Array(numberOfSlots)].map((x, index) => {
				const isFocused = index === focusedInput;

				return (
					<TextInput
						ref={refs[index]}
						key={String(index)}
						editable={!disabled}
						autoFocus={index === 0}
						style={{ ...styles.input, ...(isFocused && { borderColor: Theme.colors.primary }) }}
						keyboardType='number-pad'
						returnKeyType='done'
						maxLength={1}
						onKeyPress={(e) => onKeyPress(e, index)}
						onChange={(e) => onChange(index, e.nativeEvent.text)}
						onFocus={() => setFocusedInput(index)}
						onBlur={() => setFocusedInput(null)}
						value={!!values[index] ? String(values[index]) : ''}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 250,
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	input: {
		width: 45,
		height: '100%',
		backgroundColor: '#DFDFDF',
		borderColor: '#A0A0A0',
		borderRadius: Theme.borderRadius,
		borderWidth: 2,
		textAlign: 'center',
	},
});
