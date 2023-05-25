import React from "react";
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import Main from "./Main";
import { Provider } from "react-redux";
import store from "./store/Store";

export default function App() {
  const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };

  const theme = extendTheme({ config });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Main />
      </NativeBaseProvider>
    </Provider>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}
