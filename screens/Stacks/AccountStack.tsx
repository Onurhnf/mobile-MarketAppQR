import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import HistoryDetailScreen from "../Account/HistoryDetail.screen";
import AccountScreen from "../Account/Account.screen";

export default function AccountStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="History" component={HistoryDetailScreen} />
    </Stack.Navigator>
  );
}
