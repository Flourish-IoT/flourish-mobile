import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { Theme } from '../../providers/Theme';
import StyledAccordion from './layout/Accordion';

interface DropDownProps {
	title?: string;
	showAllOption: boolean;
	canHaveNoneSelected?: boolean;
	canHaveMultipleSelected?: boolean;
	items: object[];
	selectedItems: number[];
	displayKey: string;
	valueKey: string;
	expanded: boolean;
	setExpanded: (open: boolean) => void;
	onFilterChange: (items: number[]) => void;
	style?: ViewStyle;
}

export default function DropDown({
	title = 'Select',
	showAllOption,
	canHaveNoneSelected = false,
	canHaveMultipleSelected = false,
	items,
	selectedItems,
	displayKey,
	valueKey,
	expanded,
	setExpanded,
	onFilterChange,
	style,
}: DropDownProps) {
	showAllOption && (items = [{ [displayKey]: 'All', [valueKey]: -1 }, ...items]);

	!canHaveMultipleSelected && (items = items.filter((i) => !selectedItems.includes(i[valueKey])));

	const longestDisplayName: number = Math.max.apply(
		Math,
		[...items, { [displayKey]: title }].map((i) => String(i[displayKey]).length)
	);

	const styles = StyleSheet.create({
		accordion: {
			width: longestDisplayName * 8 + 130,
			backgroundColor: 'white',
			borderRadius: Theme.borderRadius,
			borderBottomLeftRadius: expanded ? 0 : Theme.borderRadius,
			borderBottomRightRadius: expanded ? 0 : Theme.borderRadius,
			...style,
		},
		accordionText: {
			fontFamily: 'Lato-Bold',
		},
		itemStyle: {
			backgroundColor: 'white',
		},
	});

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
		canHaveMultipleSelected ? onFilterChange([...selectedItems, newSelection]) : onFilterChange([newSelection]);
		!canHaveMultipleSelected && setExpanded(false);
	};

	return (
		<StyledAccordion
			title={title}
			style={styles.accordion}
			titleStyle={styles.accordionText}
			expanded={expanded}
			setExpanded={setExpanded}
			iconProps={{ fill: 'white', withBackground: true }}
		>
			{items.map((item, index, { length }) => {
				const isSelected = selectedItems.some((sItem) => sItem === item[valueKey]);
				const isLast = index === length - 1;
				return (
					<List.Item
						key={index + String(item[valueKey])}
						title={item[displayKey]}
						onPress={() => toggleSelected(item[valueKey], isSelected)}
						style={{
							...styles.itemStyle,
							borderBottomLeftRadius: isLast ? Theme.borderRadius : 0,
							borderBottomRightRadius: isLast ? Theme.borderRadius : 0,
						}}
					/>
				);
			})}
		</StyledAccordion>
	);
}
