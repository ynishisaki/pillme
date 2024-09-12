import CustomOutlineButton from "@/components/common/CustomOutlineButton";
import { CurrentSheet } from "@/components/records/CurrentSheet";
import { secondaryColor } from "@/constants/color";
import { useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface props {}

export default function SheetModal(props: props) {
	const [modalVisible, setModalVisible] = useState(false);
	function handleToggleModalVisible() {
		setModalVisible(!modalVisible);
	}

	function handleClose() {
		handleToggleModalVisible();
	}

	return (
		<>
			<Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={handleClose}>
				<View style={styles.centeredView}>
					<TouchableWithoutFeedback onPress={handleClose}>
						<View style={styles.modalOverlay} />
					</TouchableWithoutFeedback>

					<View style={styles.modalView}>
						<CurrentSheet handleClose={handleClose} />
					</View>
				</View>
			</Modal>

			<CustomOutlineButton
				onPress={handleToggleModalVisible}
				// bgColor={"#2196F3"}
				// textColor='white'
				bgColor={secondaryColor}
				textColor='gray'
				title='現在のシートを確認する'
				iconComponent={null}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		margin: 20,
	},
	contentLayout: {
		flexDirection: "row",
		justifyContent: "center",
		padding: 20,
	},
	textLayout: {
		marginTop: 16,
	},
});
