import { View, TouchableOpacity, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';
import Grid from '../../../lib/icons/Grid';
import CarouselIcon from '../../../lib/icons/Carousel';
import { Theme } from '../../../providers/Theme';
import { ViewMode } from '../';

interface ViewModeToggleProps {
	viewMode: ViewMode;
	onPress: () => void;
	containerStyle?: ViewStyle;
}

export default function ViewModeToggle({ viewMode, onPress, containerStyle }: ViewModeToggleProps) {
	return (
		<TouchableOpacity style={{ ...styles.segmentBtn, ...containerStyle }} onPress={onPress}>
			<View
				style={{
					...styles.segmentBtnContent,
					backgroundColor: viewMode === 'Carousel' ? Theme.colors.primary : 'white',
				}}
			>
				<CarouselIcon fill={viewMode === 'Carousel' ? 'white' : Theme.colors.primary} />
			</View>
			<View
				style={{
					...styles.segmentBtnContent,
					backgroundColor: viewMode === 'Grid' ? Theme.colors.primary : 'white',
				}}
			>
				<Grid fill={viewMode === 'Grid' ? 'white' : Theme.colors.primary} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	segmentBtn: {
		flexDirection: 'row',
		borderRadius: 50,
		borderStyle: 'solid',
		borderColor: Theme.colors.primary,
		borderWidth: Theme.borderWidth,
		overflow: 'hidden',
	},
	segmentBtnContent: {
		width: 50,
		height: 30,
		margin: 0,
		...Theme.util.flexCenter,
	},
});
