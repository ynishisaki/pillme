import CustomButton from "@/components/common/CustomButton";
import { CustomCalender } from "@/components/common/CustomCalender";
import { ThemedText } from "@/components/common/ThemedText";
import ContentSubTitle from "@/components/common/content/ContentSubTitle";
import { Colors } from "@/constants/Colors";
import { locale, md, yyyymmdd } from "@/constants/tempo-options";
import { addDay, diffDays, format } from "@formkit/tempo";
import { useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

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
			selectedColor: Colors.lightBlue,
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
								<ContentSubTitle title='最新の服薬開始日' />

								<View>
									<CustomCalender
										handleDayPress={handleDayPress}
										markedDates={markedDates}
										minDate={minDateStr}
										maxDate={maxDateStr}
									/>

									<ThemedText>
										{`${selectedDateForDisplay}（本日服薬${currentNumOfDays}日目）`}
									</ThemedText>
								</View>
							</View>

							<CustomButton type='fill' title='決定' onPress={handleDecide} />
						</View>
					</View>
				</Modal>
			</View>

			<CustomButton
				type='default'
				title={`${parentDateForDisplay}（本日服薬${props.numOfDays}日目）`}
				onPress={handleToggleModalVisible}
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
		borderRadius: 16,
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
