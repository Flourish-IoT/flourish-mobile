import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Tutorial } from '../../../data/education';
import Typography from '../../../lib/components/styled/Typography';
import { Video } from 'expo-av';
import { Theme } from '../../../providers/Theme';
import { WebView } from 'react-native-webview';

interface VideoCardProps {
	videoData: Tutorial;
	containerStyle?: ViewStyle;
}

export default function VideoCard({ videoData, containerStyle }: VideoCardProps) {
	const videoIsDirectFile = videoData.link.split('/').pop().indexOf('.') > 0; // Checks if there's a period at the end

	return (
		<View style={{ ...styles.container, ...(containerStyle as object) }}>
			{videoIsDirectFile ? (
				<Video style={styles.video} source={{ uri: videoData.link }} useNativeControls resizeMode='contain' />
			) : (
				<WebView style={styles.video} source={{ uri: videoData.link }} />
			)}

			<View style={styles.titleContainer}>
				<Typography variant='h3bold' style={styles.titleText}>
					{videoData.name}
				</Typography>
			</View>
		</View>
	);
}

const imageHeightPercentage = 60;
const textHeightPercentage = 100 - imageHeightPercentage;

const styles = StyleSheet.create({
	container: {
		width: 180,
		height: 190,
	},
	video: {
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
