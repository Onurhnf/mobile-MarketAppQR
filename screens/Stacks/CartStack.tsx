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
import CartHome from "../Home/CartHome.screen";
import PurchaseScreen from "../Home/Purchase.screen";

export default function CartStack() {
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
        name="Home"
        component={CartHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Purchase" component={PurchaseScreen} />

      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerTitleStyle: { fontWeight: "bold" },
          headerBackgroundContainerStyle: {
            backgroundColor: "#a5f3fc30",
          },
        }}
      />
    </Stack.Navigator>
  );
}
