import { createStackNavigator } from "@react-navigation/stack";
import { EditWeeklyRecord } from "~/pages/EditWeeklyRecord";
import { Record } from "~/pages/Record";

const Stack = createStackNavigator();

export default function RecordStacks() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Record'
				component={Record}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name='EditWeeklyRecord' component={EditWeeklyRecord} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}
