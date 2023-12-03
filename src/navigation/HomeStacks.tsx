import { createStackNavigator } from "@react-navigation/stack";
import { EditWeeklyRecord } from "~/pages/EditWeeklyRecord";
import { Home } from "~/pages/Home";
import { Record } from "~/pages/Record";

const Stack = createStackNavigator();

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
			<Stack.Screen name='EditWeeklyRecord' component={EditWeeklyRecord} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}
