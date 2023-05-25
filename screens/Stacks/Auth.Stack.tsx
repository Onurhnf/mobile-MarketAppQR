import LoginScreen from "../Auth/Login.screen";
import SignUpScreen from "../Auth/SignUp.screen";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

export default function AuthStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
