import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Home/Home.screen";
import Scanner from "../../components/QR/Scanner.component";
import { useTheme } from "native-base";

export default function HomeStack() {
  const Stack = createStackNavigator();
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          headerTransparent: true,
          headerTintColor: theme.colors.primary[200],
          headerTitleStyle: { fontWeight: "bold" },
          headerBackgroundContainerStyle: {
            backgroundColor: "#a5f3fc30",
          },
        }}
      />
    </Stack.Navigator>
  );
}
