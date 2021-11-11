import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Theme from "../theme";

export default function AppBar() {
	const navigation = useNavigation();
	const onNavigate = (newScreen) => {
		navigation.navigate(newScreen);
	};

	return (
		<View style={styles.container}>
			<Button
				type='clear'
				style={styles.target}
				onPress={() => {
					onNavigate("Home");
				}}
				icon={{
					name: "home",
					size: 40,
					color: "white",
				}}
			/>
			<Button
				type='clear'
				style={styles.target}
				onPress={() => {
					onNavigate("Testing");
				}}
				icon={{
					name: "menu",
					size: 40,
					color: "white",
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.colors.primary,
		position: "absolute",
		bottom: 0,
		paddingBottom: 15,
		paddingTop: 5,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	target: {
		alignItems: "center",
	},
	icon: {
		width: "100%",
	},
});
