import React, { useLayoutEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mission } from '../../../data/rewards';
import Confetti from '../../../lib/components/animations/Confetti';
import StyledButton from '../../../lib/components/styled/Button';
import Typography from '../../../lib/components/styled/Typography';
import { getMissionImage } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';
import PlantPot from '../../garden/components/PlantPot';

interface ClaimedMissionDialogProps {
	mission: Mission;
	onClose: () => void;
}

const dimensions = Dimensions.get('window');
const startPos = dimensions.height;

export default function ClaimedMissionDialog({ mission, onClose }: ClaimedMissionDialogProps) {
	const insets = useSafeAreaInsets();

	const springAnim = useRef(new Animated.Value(startPos)).current;

	const slide = (direction: 'up' | 'down') => {
		Animated.spring(springAnim, {
			toValue: direction === 'down' ? startPos : 0,
			useNativeDriver: true,
		}).start();
	};

	const onClosePress = () => {
		slide('down');
		setTimeout(onClose, 500);
	};

	useLayoutEffect(() => {
		slide('up');
	}, []);

	const styles = StyleSheet.create({
		modal: {
			...(StyleSheet.absoluteFill as object),
			paddingTop: insets.top,
			paddingBottom: insets.bottom,
			paddingHorizontal: Theme.spacing.screenContainer * 1.5,
			backgroundColor: '#000000',
			...Theme.util.flexCenter,
		},
		contentContainer: {
			width: '100%',
			padding: Theme.spacing.screenContainer,
			borderWidth: Theme.borderWidth * 2,
			borderColor: Theme.colors.primary,
			backgroundColor: 'white',
			borderRadius: Theme.borderRadius,
			height: 500,
			justifyContent: 'space-around',
			alignItems: 'center',
			...Theme.shadow,
		},
		text: {
			color: Theme.colors.primary,
		},
		confetti: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			width: dimensions.width,
			transform: [{ scale: 1.25 }],
		},
	});

	return (
		<Portal>
			<View style={{ ...styles.modal, backgroundColor: Theme.colors.backdrop }}>
				<Confetti style={styles.confetti} />
				<Animated.View style={[styles.contentContainer, { transform: [{ translateY: springAnim }] }]}>
					<Typography variant='h1' style={styles.text}>
						MISSION COMPLETE
					</Typography>
					<PlantPot image={getMissionImage(mission.image)} isLocalImage />
					<Typography variant='body' style={styles.text}>
						+{mission.points} points
					</Typography>
					<Typography variant='h2' style={styles.text}>
						{mission.title}
					</Typography>
					<StyledButton variant='primary' title='Close' onPress={onClosePress} />
				</Animated.View>
			</View>
		</Portal>
	);
}
