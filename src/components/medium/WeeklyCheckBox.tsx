import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CancelSmIcon, DropSmIcon, PillSmIcon } from "../small/Icons";

export default ({
	title,
	isChecked,
	isRestPeriod,
}: {
	title: string;
	isChecked: boolean;
	isRestPeriod: boolean;
}) => {
	console.log("isChecked", isChecked);
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={25}
				fillColor={isRestPeriod ? "lightgray" : "#F6B69A"} // タスク
				unfillColor='#fcfae8'
				isChecked={isRestPeriod ? true : isChecked} // must set
				disableText={true}
				ImageComponent={
					isRestPeriod
						? CancelSmIcon
						: title === "服薬"
						? PillSmIcon
						: DropSmIcon
				}
				disabled={true}
				disableBuiltInState={isChecked}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
