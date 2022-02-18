import React from 'react';
import { TouchableOpacity, StyleSheet, Image, ViewStyle } from 'react-native';
import { Achievement } from '../../data/rewards';
import HalfPot from '../../lib/icons/HalfPot';
import { Theme } from '../../providers/Theme';

interface BadgePotProps {
	badge: Achievement;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	imageStyle?: ViewStyle;
}

export default function BadgePot({ badge, onPress, containerStyle, imageStyle }: BadgePotProps) {
	return (
		<TouchableOpacity style={{ ...styles.badge, ...containerStyle }} onPress={onPress} activeOpacity={onPress ? 0.3 : 1}>
			<Image
				style={{ ...styles.image, ...(imageStyle as object) }}
				source={badge.image ? { uri: badge.image } : require('../../lib/assets/placeholder/plant.png')}
			/>
			<HalfPot />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	badge: {
		height: '100%',
		width: '30%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	image: {
		height: undefined,
		width: '80%',
		aspectRatio: 1 / 1,
		borderTopLeftRadius: Theme.borderRadius,
		borderTopRightRadius: Theme.borderRadius,
		transform: [{ translateY: 1 }], // NOTE: This fixes 1px gap between image and pot
	},
});
