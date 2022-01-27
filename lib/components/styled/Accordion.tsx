import React, { ReactNode, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { Theme } from '../../../providers/Theme';
import Chevron from '../../icons/Chevron';

interface StyledAccordion {
	title: ReactNode;
	style?: ViewStyle;
	titleStyle?: StyleProp<TextStyle>;
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
	children: ReactNode;
}

export default function StyledAccordion({ title, titleStyle, style, children, expanded, setExpanded, ...rest }: StyledAccordion) {
	return (
		<List.Accordion
			title={title}
			// @ts-ignore
			titleStyle={{ color: Theme.colors.text, fontWeight: 'bold', ...titleStyle }}
			style={{ height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', ...style }}
			right={(props) => <List.Icon {...props} icon={() => <Chevron direction={expanded ? 'up' : 'down'} />} />}
			expanded={expanded}
			onPress={() => {
				setExpanded(!expanded);
			}}
			{...rest}
		>
			{children}
		</List.Accordion>
	);
}
