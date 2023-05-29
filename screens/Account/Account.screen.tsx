import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { Box, Pressable, theme, useColorModeValue } from "native-base";
import { TabView } from "react-native-tab-view";
import { Animated, Dimensions, StatusBar } from "react-native";
import UserDetailsScreen from "../../components/Account/AccountDetail.component";
import ChangePasswordScreen from "../../components/Account/ChangePassword.component";
import ShoppingHistoryScreen from "../../components/Account/ShoppingHistory.component";

type Route = {
  key: string;
  title: string;
};

type RenderSceneProps = {
  route: Route;
};

export default function AccountScreen({ navigation }: any) {
  const user = useSelector((state: RootState) => state.user.data);

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<Route[]>([
    { key: "userDetails", title: "User Details" },
    { key: "changePassword", title: "Change Password" },
    { key: "history", title: "Shopping History" },
  ]);

  const initialLayout = {
    width: Dimensions.get("window").width,
  };

  const renderScene = ({ route }: RenderSceneProps) => {
    switch (route.key) {
      case "userDetails":
        return <UserDetailsScreen user={user} />;
      case "changePassword":
        return <ChangePasswordScreen navigation={navigation} />;
      case "history":
        return <ShoppingHistoryScreen navigation={navigation} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: Route, i: number) => i
    );
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: Route, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i ? theme.colors.cyan[600] : theme.colors.blueGray[500];
          const borderColor = index === i ? "cyan.600" : "coolGray.200";
          return (
            <Box
              borderBottomWidth="5"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              py="3"
              key={route.key}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    />
  );
}
