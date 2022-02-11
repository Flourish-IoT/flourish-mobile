import React, { Children, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '../../../providers/Theme';

interface SegmentedListProps {
	children?: ReactNode;
	style?: ViewStyle;
}

export default function SegmentedList({ children, style, ...rest }: SegmentedListProps) {
	const styles = StyleSheet.create({
		container: {
			width: '100%',
			borderRadius: Theme.borderRadius,
			overflow: 'hidden',
			...style,
		},
		divider: {
			width: '100%',
			minHeight: 3,
		},
		listItem: {
			width: '100%',
			height: 65,
			backgroundColor: 'white',
		},
	});

	return (
		<View style={styles.container}>
			{Children.toArray(children).map((item, index, { length }) => {
				const isLast = index === length - 1;

				return (
					<View
						key={index}
						style={{
							...styles.listItem,
							...(!isLast && { borderBottomWidth: 1, borderColor: Theme.colors.disabled }),
						}}
						{...rest}
					>
						{item}
					</View>
				);
			})}
		</View>
	);
}
