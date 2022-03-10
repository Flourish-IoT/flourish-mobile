import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ViewMode } from '..';
import Typography from '../../../lib/components/styled/Typography';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';
import PotFullSize, { PotBaseSvgProps } from '../../../lib/icons/PotFullSize';

interface PlantProps {
	viewMode: ViewMode;
	image?: string;
	title?: string;
	subtitle?: string;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	svgProps?: PotBaseSvgProps;
}

export default function PlantPot({ viewMode, image, title, subtitle, onPress, containerStyle, svgProps }: PlantProps) {
	const svgStyle = svgProps?.style;

	const styles = StyleSheet.create({
		touchContainer: {
			width: viewMode === 'Carousel' ? '100%' : '50%',
			...containerStyle,
		},
		container: {
			width: '100%',
			...Theme.util.flexCenter,
		},
		imageContainer: {
			width: '80%',
			height: undefined,
			aspectRatio: 1 / 1,
			borderWidth:
				Theme.borderWidth *
				// Fixes the gap for the img overlap fix
				1.1,
			borderBottomWidth: 0,
			borderColor: Theme.colors.accent,
			borderTopLeftRadius: Theme.borderRadius,
			borderTopRightRadius: Theme.borderRadius,
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			height: '100%',
			// Fixes img overlap
			borderTopLeftRadius: Theme.borderRadius,
			borderTopRightRadius: Theme.borderRadius,
		},
		potBaseGraphic: {
			...(svgStyle ?? ({} as object)),
		},
		potBaseText: {
			position: 'absolute',
			bottom: 0,
			width: '80%',
			height: 93.8,
			...Theme.util.flexCenter,
		},
		text: {
			width: '100%',
			color: 'white',
			textAlign: 'center',
		},
	});

	return (
		<TouchableOpacity style={styles.touchContainer} onPress={onPress} activeOpacity={!onPress && 1}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={!!image ? { uri: image } : getPlaceHolder('plant')} />
				</View>
				<PotFullSize width='100%' style={styles.potBaseGraphic} {...svgProps} />
				{(title || subtitle) && (
					<View style={styles.potBaseText}>
						<Typography variant='h3bold' style={styles.text}>
							{title}
						</Typography>
						<Typography variant='body' style={styles.text}>
							{subtitle}
						</Typography>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
}
