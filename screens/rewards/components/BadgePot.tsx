import React from 'react';
import { TouchableOpacity, StyleSheet, Image, ViewStyle, View } from 'react-native';
import { Mission } from '../../../data/rewards';
import Typography from '../../../lib/components/styled/Typography';
import HalfPot from '../../../lib/icons/HalfPot';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface BadgePotProps {
	badge: Mission;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	imageStyle?: ViewStyle;
	showLevel?: boolean;
}

export default function BadgePot({ badge, onPress, containerStyle, imageStyle, showLevel = false }: BadgePotProps) {
	return (
		<TouchableOpacity
			style={{ ...styles.container, ...containerStyle }}
			onPress={onPress}
			disabled={!onPress}
			activeOpacity={onPress ? 0.3 : 1}
		>
			<View style={styles.imageContainer}>
				<Image
					style={{ ...styles.image, ...(imageStyle as object) }}
					source={badge.image ? { uri: badge.image } : getPlaceHolder('plant')}
				/>
			</View>
			<View style={styles.potContainer}>
				<HalfPot style={styles.pot} />
			</View>
			{showLevel && (
				<View style={styles.labelContainer}>
					<Typography variant='body'>Lvl {badge.level}</Typography>
				</View>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 90,
		height: 120,
		...Theme.util.flexCenter,
		transform: [{ translateY: 0 }], // FIX: Fixes centering of pot within container
	},
	imageContainer: {
		width: '80%',
		height: '60%',
	},
	image: {
		width: '100%',
		height: '100%',
		borderTopLeftRadius: Theme.borderRadius,
		borderTopRightRadius: Theme.borderRadius,
		transform: [{ translateY: 8 }], // FIX: Fixes centering of pot within container
	},
	potContainer: {
		width: '100%',
		height: '40%',
		transform: [{ translateY: 8 }], // FIX: Fixes centering of pot within container
	},
	pot: {
		maxWidth: '100%',
		height: '100%',
		transform: [{ translateY: -3 }], // FIX: Fixes gap between image and pot
	},
	labelContainer: {
		position: 'absolute',
		bottom: 10,
		right: -10,
		paddingHorizontal: Theme.spacing.sm,
		paddingVertical: Theme.spacing.xs,
		backgroundColor: 'white',
		borderRadius: 50,
		alignSelf: 'flex-end',
		...Theme.util.flexCenter,
		...Theme.shadow,
	},
});
