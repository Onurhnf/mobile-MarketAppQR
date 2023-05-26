import { useTheme } from "native-base";
import LoginScreen from "../Auth/Login.screen";
import SignUpScreen from "../Auth/SignUp.screen";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

export default function AuthStack() {
  const Stack = createStackNavigator();
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: { backgroundColor: theme.colors.cyan[600] },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
