import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthStack from "./screens/Stacks/Auth.Stack";
import { useSelector } from "react-redux";
import { RootState } from "./store/Store";
import HomeStack from "./screens/Stacks/Home.Stack";

const Main: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Main;
