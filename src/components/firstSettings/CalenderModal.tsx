import { addDay, diffDays, format } from "@formkit/tempo";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { CustomCalender } from "~/components/common/CustomCalender";
import CustomOutlineButton from "~/components/common/CustomOutlineButton";
import CustomDatePickerModalButton from "~/components/firstSettings/CustomDatePickerModalButton";
import { lightBlue } from "~/styles/color";
import { locale, md, yyyymmdd } from "~/utils/tempo-options";

interface props {
	numOfDays: number;
	handleSetNumOfDays: (numOfDays: number) => void;
}

export default function CalenderModal(props: props) {
	const todayDate = new Date();

	const parentDate = format(addDay(todayDate, -props.numOfDays + 1), "YYYY-MM-DD", locale);
	const parentDateForDisplay = format(parentDate, md, locale);

	// 120日前まで（今日の服薬も含めるため+1）
	const minDateStr = format(addDay(todayDate, -120 + 1), yyyymmdd, locale);
	const maxDateStr = format(todayDate, yyyymmdd, locale);

	const [selectedDateStr, setSelectedDateStr] = useState<string>(parentDate);
	const selectedDateForDisplay = format(selectedDateStr, md, locale);

	function handleDayPress(date: DateData) {
		setSelectedDateStr(date.dateString);
	}

	const markedDates: MarkedDates = {
		[selectedDateStr]: {
			selected: true,
			selectedColor: lightBlue,
		},
	};

	// 今日の服薬も含めるため+1
	const currentNumOfDays = diffDays(todayDate, selectedDateStr) + 1;

	const [modalVisible, setModalVisible] = useState(false);
	function handleToggleModalVisible() {
		setModalVisible(!modalVisible);
	}

	function handleCancel() {
		setSelectedDateStr(parentDate); // reset date
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
						<TouchableWithoutFeedback onPress={handleCancel}>
							<View style={styles.modalOverlay} />
						</TouchableWithoutFeedback>

						<View style={styles.modalView}>
							<View>
								<Text>最新の服薬開始日</Text>
								<View>
									<CustomCalender
										handleDayPress={handleDayPress}
										markedDates={markedDates}
										minDate={minDateStr}
										maxDate={maxDateStr}
									/>
									<Text>{`${selectedDateForDisplay}（本日服薬${currentNumOfDays}日目）`}</Text>
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
				title={`${parentDateForDisplay}（本日服薬${props.numOfDays}日目）`}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
	},
	modalOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
