import React from 'react';
import { TouchableOpacity, StyleSheet, Image, ViewStyle, View } from 'react-native';
import { Achievement } from '../../../data/rewards';
import Typography from '../../../lib/components/styled/Typography';
import HalfPot from '../../../lib/icons/HalfPot';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface BadgePotProps {
	badge: Achievement;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	imageStyle?: ViewStyle;
	showLevel?: boolean;
	isLocked: boolean;
}

export default function BadgePot({ badge, onPress, containerStyle, imageStyle, showLevel = false, isLocked }: BadgePotProps) {
	return (
		<TouchableOpacity
			style={{ ...styles.badge, ...containerStyle }}
			onPress={onPress}
			disabled={isLocked}
			activeOpacity={onPress ? 0.3 : 1}
		>
			<Image
				style={{ ...styles.image, ...(imageStyle as object) }}
				source={badge.image ? { uri: badge.image } : getPlaceHolder('plant')}
			/>
			<HalfPot />
			{showLevel && (
				<View style={styles.labelContainer}>
					<Typography variant='body'>Lvl {badge.level}</Typography>
				</View>
			)}
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
	labelContainer: {
		position: 'absolute',
		bottom: 25,
		paddingHorizontal: Theme.spacing.sm,
		paddingVertical: Theme.spacing.xs,
		backgroundColor: 'white',
		borderRadius: 50,
		alignSelf: 'flex-end',
		...Theme.util.flexCenter,
		...Theme.shadow,
		transform: [{ translateX: 10 }],
	},
});
