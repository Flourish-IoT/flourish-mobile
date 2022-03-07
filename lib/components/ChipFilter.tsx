import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { Chip } from 'react-native-paper';
import { Theme } from '../../providers/Theme';

interface ChipFilterProps {
	showAllOption: boolean;
	canHaveNoneSelected?: boolean;
	items: object[];
	selectedItems: number[];
	displayKey: string;
	valueKey: string;
	onFilterChange: (items: number[]) => void;
	containerStyle?: ViewStyle;
}

export default function ChipFilter({
	showAllOption,
	canHaveNoneSelected = false,
	items,
	selectedItems,
	displayKey,
	valueKey,
	onFilterChange,
	containerStyle,
}: ChipFilterProps) {
	const toggleSelected = (newSelection: number, isSelected: boolean) => {
		// If selecting an already selected record
		if (isSelected) {
			const potentialNextSelection = selectedItems.filter((item) => item !== newSelection);

			// If (allowed to have 0 selected and next selection will have 0) OR (next selection has more than 0)
			if ((canHaveNoneSelected && potentialNextSelection.length === 0) || potentialNextSelection.length > 0) {
				// Remove it
				onFilterChange(potentialNextSelection);
				return;
			}
		}

		// If (selecting the ALL record) OR (the ALL record is already selected AND a different one is now selected)
		if (newSelection === -1 || selectedItems.some((sR) => sR === -1)) {
			// Remove all other selections
			onFilterChange([newSelection]);
			return;
		}

		// Add to the currently selected
		onFilterChange([...selectedItems, newSelection]);
	};

	showAllOption && (items = [{ [displayKey]: 'All', [valueKey]: -1 }, ...items]);

	return (
		<ScrollView horizontal style={{ ...styles.container, ...containerStyle }}>
			{items.map((item, index) => {
				const isSelected = selectedItems.some((sItem) => sItem === item[valueKey]);
				return (
					<Chip
						key={index + String(item[valueKey])}
						selected={isSelected}
						onPress={() => toggleSelected(item[valueKey], isSelected)}
						icon={() => null}
						textStyle={{ ...styles.textStyle, color: isSelected ? 'white' : Theme.colors.text }}
						style={{
							...styles.chipContainer,
							backgroundColor: isSelected ? Theme.colors.primary : 'white',
						}}
					>
						{item[displayKey]}
					</Chip>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		overflow: 'visible',
	},
	chipContainer: {
		marginHorizontal: Theme.spacing.xs,
	},
	textStyle: {
		paddingRight: 4,
	},
});
