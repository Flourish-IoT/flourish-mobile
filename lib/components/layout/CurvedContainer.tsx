import React, { PropsWithChildren } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '../../../providers/Theme';

interface TopToCurvedContainerProps extends PropsWithChildren<unknown> {
	containerStyle?: ViewStyle;
	innerStyle?: ViewStyle;
	scrolls?: boolean;
}

const dimensions = Dimensions.get('window');

export function TopToCurvedContainer({ children, containerStyle, innerStyle, scrolls = false }: TopToCurvedContainerProps) {
	return (
		<ScrollView
			contentContainerStyle={{ ...styles.topToCurvedContainerOuter, ...containerStyle }}
			style={{ ...styles.topToCurvedContainerInner, ...innerStyle }}
			showsVerticalScrollIndicator={false}
			scrollEnabled={scrolls}
		>
			{children}
		</ScrollView>
	);
}

interface CurvedContainerProps extends PropsWithChildren<unknown> {
	containerStyle?: ViewStyle;
	innerStyle?: ViewStyle;
	circleStyle?: ViewStyle;
	scrolls?: boolean;
}

export default function CurvedContainer({
	children,
	containerStyle,
	innerStyle,
	circleStyle,
	scrolls = false,
}: CurvedContainerProps) {
	return (
		<>
			<View style={{ ...styles.curvedContainerCircleBg, ...circleStyle }} />
			<ScrollView
				contentContainerStyle={{ ...styles.curvedContainerOuter, ...containerStyle }}
				style={{ ...styles.curvedContainerInner, ...innerStyle }}
				showsVerticalScrollIndicator={false}
				scrollEnabled={scrolls}
			>
				{children}
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	curvedContainerCircleBg: {
		zIndex: 0,
		height: dimensions.width,
		width: dimensions.width,
		backgroundColor: 'white',
		position: 'absolute',
		bottom: -dimensions.height / 2 + 10,
		left: '50%',
		borderRadius: 1000,
		transform: [{ translateX: -dimensions.width / 2 }, { translateY: -dimensions.width / 2 }, { scale: 2 }],
		...Theme.shadow,
	},
	topToCurvedContainerOuter: {
		height: '50%',
		width: '100%',
	},
	topToCurvedContainerInner: {
		width: '100%',
	},
	curvedContainerOuter: {
		height: '100%',
		width: '100%',
		...Theme.util.flexCenter,
	},
	curvedContainerInner: {
		height: '40%',
	},
});
