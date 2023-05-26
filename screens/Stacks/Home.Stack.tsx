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

export default function HomeStack() {
  const Stack = createStackNavigator();
  const theme = useTheme();
  const isCartExists = useSelector(
    (state: RootState) => state.cart.isCartExists
  );

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home Page"
        component={isCartExists ? BottomWithCartTab : BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerTintColor: theme.colors.cyan[600],
          headerTitleStyle: { fontWeight: "bold" },
          headerBackgroundContainerStyle: {
            backgroundColor: "#a5f3fc30",
          },
        }}
      />
    </Stack.Navigator>
  );
}
