import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { DropIcon, PillIcon } from "../atoms/Icons";

export default ({
	title,
	isChecked,
}: {
	title: string;
	isChecked: boolean;
}) => {
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={25}
				fillColor='#F6B69A'
				unfillColor='#fcfae8'
				isChecked={isChecked} // must set
				disableText={true}
				ImageComponent={
					title === "服薬" ? PillIcon("sm") : DropIcon("sm")
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
