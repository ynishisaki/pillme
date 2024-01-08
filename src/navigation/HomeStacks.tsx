import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditWeeklyRecord } from "~/pages/EditWeeklyRecord";
import { Home } from "~/pages/Home";

const Stack = createNativeStackNavigator();

export default function HomeStacks() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='EditWeeklyRecord'
				component={EditWeeklyRecord}
				options={{
					headerShown: false,
					animation: "none",
				}}
			/>
		</Stack.Navigator>
	);
}
