import React from 'react';
import { View, Image, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Course } from '../../../data/education';
import Typography from '../../../lib/components/styled/Typography';
import { getPlaceHolder } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';

interface CourseCardProps {
	cardData: Course;
	onPress: () => void;
	containerStyle?: ViewStyle;
}

export default function CourseCard({ cardData, onPress, containerStyle }: CourseCardProps) {
	return (
		<TouchableOpacity style={{ ...styles.container, ...(containerStyle as object) }} onPress={onPress}>
			<Image style={styles.image} source={cardData.image ? { uri: cardData.image } : getPlaceHolder('plant')} />
			<View style={styles.titleContainer}>
				<Typography variant='h3bold' style={styles.titleText}>
					{cardData.name}
				</Typography>
			</View>
		</TouchableOpacity>
	);
}

const imageHeightPercentage = 60;
const textHeightPercentage = 100 - imageHeightPercentage;

const styles = StyleSheet.create({
	container: {
		width: 180,
		height: 190,
	},
	image: {
		width: '100%',
		height: imageHeightPercentage + '%',
		borderTopLeftRadius: Theme.borderRadius,
		borderTopRightRadius: Theme.borderRadius,
	},
	titleContainer: {
		...Theme.util.flexCenter,
		width: '100%',
		height: textHeightPercentage + '%',
		backgroundColor: 'white',
		paddingVertical: Theme.spacing.xs,
		paddingHorizontal: Theme.spacing.sm,
		borderBottomLeftRadius: Theme.borderRadius,
		borderBottomRightRadius: Theme.borderRadius,
	},
	titleText: {
		overflow: 'hidden',
	},
});
