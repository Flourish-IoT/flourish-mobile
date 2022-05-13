import React, { useRef, useState, LegacyRef, useEffect } from 'react';
import {
	Keyboard,
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputKeyPressEventData,
	View,
	ViewStyle,
} from 'react-native';
import { Theme } from '../../providers/Theme';

interface VerificationCodeFieldProps {
	onInput: (code: number[]) => void;
	value: number[];
	disabled?: boolean;
	containerStyle?: ViewStyle;
}

type VerificationCode = number | null;

const slots: VerificationCode[] = [null, null, null, null];

export default function VerificationCodeField({ onInput, value, disabled = false, containerStyle }: VerificationCodeFieldProps) {
	const [values, setValues] = useState(value);
	const [focusedInput, setFocusedInput] = useState<VerificationCode>();
	const refs: LegacyRef<TextInput>[] = [useRef(), useRef(), useRef(), useRef()];

	const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, slot: number) => {
		let tempVals = values;
		const key = e.nativeEvent.key;
		const isNum = !isNaN(Number(key));

		// @ts-ignore: .current is a valid property
		const firstInput = refs[0].current;
		// @ts-ignore: .current is a valid property
		const input = refs[slot].current;
		// @ts-ignore: .current is a valid property
		const nextInput = refs[slot + 1]?.current;

		if (isNum) {
			tempVals[slot] = Number(key);
			slot !== slots.length - 1 ? nextInput.focus() : input.blur();
			tempVals.every((v) => !isNaN(Number(v))) && input.blur();
		} else {
			if (key === 'Backspace') {
				tempVals = values.map((v) => null);
				input.blur();
				firstInput.focus();
			}
		}

		setValues([...tempVals]);
		onInput(tempVals);
	};

	return (
		<View style={{ ...styles.container, ...containerStyle }}>
			{slots.map((slotVal, index) => {
				const isFocused = index === focusedInput;

				return (
					<TextInput
						ref={refs[index]}
						key={String(index + slotVal)}
						editable={!disabled}
						autoFocus={index === 0}
						style={{ ...styles.input, ...(isFocused && { borderColor: Theme.colors.primary }) }}
						keyboardType='number-pad'
						returnKeyType='done'
						maxLength={1}
						onKeyPress={(e) => onKeyPress(e, index)}
						onFocus={() => setFocusedInput(index)}
						onBlur={() => setFocusedInput(null)}
						value={!!value[index] ? String(value[index]) : ''}
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
