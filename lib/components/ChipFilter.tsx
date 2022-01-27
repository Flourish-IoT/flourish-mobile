import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from 'react-native-paper';

interface ChipFilterProps {
	showAllOption: boolean;
	canHaveNoneSelected?: boolean;
	items: object[];
	selectedItems: number[];
	displayKey: string;
	valueKey: string;
	onFilterChange: (items: number[]) => void;
}

export default function ChipFilter({
	showAllOption,
	canHaveNoneSelected = false,
	items,
	selectedItems,
	displayKey,
	valueKey,
	onFilterChange,
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
		<ScrollView horizontal>
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				{items.map((item, index) => {
					const isSelected = selectedItems.some((sItem) => sItem === item[valueKey]);
					return (
						<Chip
							key={index + String(item[valueKey])}
							selected={isSelected}
							onPress={() => toggleSelected(item[valueKey], isSelected)}
							style={{ marginHorizontal: 3 }}
						>
							{item[displayKey]}
						</Chip>
					);
				})}
			</View>
		</ScrollView>
	);
}
