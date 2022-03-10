import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mission } from '../../../data/rewards';
import StyledButton from '../../../lib/components/styled/Button';
import Typography from '../../../lib/components/styled/Typography';
import { padString } from '../../../lib/utils/helper';
import { Theme } from '../../../providers/Theme';
import BadgePot from './BadgePot';

interface ClaimedMissionDialogProps {
	mission: Mission;
	onClose: () => void;
}

const startPos = Dimensions.get('window').height;

export default function ClaimedMissionDialog({ mission, onClose }: ClaimedMissionDialogProps) {
	const insets = useSafeAreaInsets();

	const springAnim = useRef(new Animated.Value(startPos)).current;
	const fadeAnim = useRef(new Animated.Value(startPos)).current;

	const slide = (direction: 'up' | 'down') => {
		Animated.spring(springAnim, {
			toValue: direction === 'down' ? startPos : 0,
			useNativeDriver: true,
		}).start();
	};

	const fade = (mode: 'in' | 'out') => {
		Animated.spring(fadeAnim, {
			toValue: mode === 'in' ? 50 : 0,
			useNativeDriver: true,
		}).start();
	};

	const onClosePress = () => {
		slide('down');
		fade('out');
		setTimeout(onClose, 500);
	};

	useLayoutEffect(() => {
		fade('in');
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
		badgePot: {
			transform: [{ scale: 2 }, { translateY: 20 }],
		},
		text: {
			color: Theme.colors.primary,
		},
		spacer: {
			marginBottom: 50,
		},
	});

	return (
		<Portal>
			<View style={{ ...styles.modal, backgroundColor: '#000000' + padString(String(fadeAnim), 'left', 2, '0') }}>
				<Animated.View style={[styles.contentContainer, { transform: [{ translateY: springAnim }] }]}>
					<Typography variant='h1' style={styles.text}>
						MISSION COMPLETE
					</Typography>
					<BadgePot image={mission.image} containerStyle={styles.badgePot} />
					<View style={styles.spacer} />
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
