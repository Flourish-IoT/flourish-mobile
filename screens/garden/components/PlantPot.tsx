import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Typography from '../../../lib/components/styled/Typography';
import { Theme } from '../../../providers/Theme';
import NewPot from '../../../lib/icons/NewPot';
import { SvgProps } from 'react-native-svg';

interface PlantProps {
	image: string | null;
	title?: string;
	subtitle?: string;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	svgProps?: SvgProps;
	isLocalImage?: boolean;
}

export default function PlantPot({ image, isLocalImage, title, subtitle, onPress, containerStyle, svgProps }: PlantProps) {
	const svgStyle = svgProps?.style;

	const styles = StyleSheet.create({
		touchContainer: {
			width: '100%',
			...containerStyle,
		},
		potBaseGraphic: {
			...((svgStyle as object) ?? {}),
		},
		textContainer: {
			position: 'absolute',
			bottom: 0,
			width: '100%',
			paddingHorizontal: '6.25%',
			height: '43.75%',
			...Theme.util.flexCenter,
		},
		text: {
			width: '100%',
			paddingHorizontal: '7%',
			color: 'white',
			textAlign: 'center',
		},
	});

	return (
		<TouchableOpacity style={styles.touchContainer} onPress={onPress} activeOpacity={!!onPress ? Theme.activeOpacity : 1}>
			<NewPot width='100%' style={styles.potBaseGraphic} imgSource={image} isLocalImage={isLocalImage} {...svgProps} />
			{(!!title || !!subtitle) && (
				<View style={styles.textContainer}>
					{!!title && (
						<Typography variant='h3bold' style={styles.text}>
							{title}
						</Typography>
					)}
					{!!subtitle && (
						<Typography variant='body' style={styles.text}>
							{subtitle}
						</Typography>
					)}
				</View>
			)}
		</TouchableOpacity>
	);
}
