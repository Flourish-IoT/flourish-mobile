import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';
import { Theme } from '../../../providers/Theme';
import Chevron from '../../icons/Chevron';

interface StyledAccordion {
	title: ReactNode;
	style?: ViewStyle;
	titleStyle?: StyleProp<TextStyle>;
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
	children: ReactNode;
	iconProps?: SvgProps;
}

export default function StyledAccordion({
	title,
	titleStyle,
	style,
	children,
	expanded,
	setExpanded,
	iconProps,
	...rest
}: StyledAccordion) {
	const styles = StyleSheet.create({
		accordion: {
			height: 50,
			maxWidth: '100%',
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			...style,
		},
		titleStyle: {
			color: Theme.colors.text,
			fontWeight: 'bold',
			...(titleStyle as object),
		},
	});

	return (
		<List.Accordion
			title={title}
			style={styles.accordion}
			titleStyle={styles.titleStyle}
			expanded={expanded}
			onPress={() => setExpanded(!expanded)}
			right={(props) => (
				<List.Icon {...props} icon={() => <Chevron direction={expanded ? 'up' : 'down'} {...iconProps} />} />
			)}
			{...rest}
		>
			{children}
		</List.Accordion>
	);
}
