import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { SvgProps } from 'react-native-svg';
import { Theme } from '../../../providers/Theme';
import Chevron, { ChevronProps } from '../../icons/Chevron';

interface StyledAccordion {
	title: ReactNode;
	style?: ViewStyle;
	titleStyle?: StyleProp<TextStyle>;
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
	children: ReactNode;
	iconProps?: ChevronProps;
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
			justifyContent: 'space-between',
			alignItems: 'center',
			...style,
		},
		title: {
			color: Theme.colors.text,
			...(titleStyle as object),
		},
		icon: {
			// TODO: Why isn't this all the way to the right because of the justifyContent?
			transform: [{ translateX: 20 }],
		},
	});

	return (
		<List.Accordion
			title={title}
			style={styles.accordion}
			titleStyle={styles.title}
			expanded={expanded}
			onPress={() => setExpanded(!expanded)}
			right={(props) => (
				<List.Icon
					style={{ ...(iconProps?.style ?? ({} as object)), ...styles.icon }}
					{...props}
					icon={() => <Chevron direction={expanded ? 'up' : 'down'} {...iconProps} />}
				/>
			)}
			{...rest}
		>
			{children}
		</List.Accordion>
	);
}
