import dayjs from "dayjs";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import CustomDatePickerModalButton from "~/components/firstSettings/CustomDatePickerModalButton";
import { secondaryColor } from "~/styles/color";

interface props {
	numOfDays: number;
	handleSetNumOfDays: (numOfDays: number) => void;
}

export default function CustomModal(props: props) {
	const parentDate = dayjs().subtract(props.numOfDays - 1, "day");

	const [selectedDate, setSelectedDate] = useState<DateType>(parentDate);

	const currentNumOfDays = dayjs().diff(selectedDate, "day") + 1;

	const [modalVisible, setModalVisible] = useState(false);
	function handleToggleModalVisible() {
		setModalVisible(!modalVisible);
	}

	function handleCancel() {
		setSelectedDate(parentDate); // reset date
		handleToggleModalVisible();
	}

	function handleDecide() {
		props.handleSetNumOfDays(currentNumOfDays);
		handleToggleModalVisible();
	}

	return (
		<>
			<View style={styles.centeredView}>
				<Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={handleCancel}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View>
								<Text>最新の服薬開始日</Text>
								<View>
									<DateTimePicker
										mode='single'
										locale='ja'
										// 120日前〜今日まで選択可能
										minDate={dayjs().subtract(120, "day")}
										maxDate={dayjs()}
										date={selectedDate}
										onChange={(params) => setSelectedDate(params.date)}
									/>

									<Text>{`${selectedDate.format("M月D日")}(今日で服薬${currentNumOfDays}日目)`}</Text>
								</View>
							</View>

							<CustomOutlineButton
								onPress={handleDecide}
								bgColor={"#2196F3"}
								textColor='white'
								title='決定'
								iconComponent={null}
							/>
						</View>
					</View>
				</Modal>
			</View>
			<CustomDatePickerModalButton
				onPress={handleToggleModalVisible}
				// title='服薬開始日の変更'
				title={`${parentDate.format("M月D日")}(今日で服薬${props.numOfDays}日目)`}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		// marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		// alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
