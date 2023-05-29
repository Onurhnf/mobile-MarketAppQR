import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Home/Home.screen";
import Scanner from "../../components/QR/Scanner.component";
import { useTheme } from "native-base";
import BottomTab from "../BottomTab/Bottom.Tab";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import BottomWithCartTab from "../BottomTab/BottomWithCart.Tab";
import HistoryDetailScreen from "../Account/HistoryDetail.screen";
import AccountScreen from "../Account/Account.screen";

export default function AccountStack() {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const isCartExists = useSelector(
    (state: RootState) => state.cart.isCartExists
  );

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
