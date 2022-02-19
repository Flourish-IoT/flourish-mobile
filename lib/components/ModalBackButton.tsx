import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../providers/Theme';
import Chevron from '../icons/Chevron';

interface ModalBackButtonProps {
	onPress: () => void;
	absolutePos: boolean;
	style?: ViewStyle;
}

export default function ModalBackButton({ onPress, absolutePos, style }: ModalBackButtonProps) {
	const styles = StyleSheet.create({
		button: {
			...(absolutePos && {
				position: 'absolute',
				top: Theme.spacing.lg,
				left: Theme.spacing.lg,
				elevation: 1,
				zIndex: 1,
			}),
			...style,
		},
	});

	return <Chevron direction='left' withBackground onPress={onPress} backgroundStyle={styles.button} />;
}
