import React, { useState } from "react";
import {
  Center,
  VStack,
  Box,
  Input,
  Button,
  useToast,
  theme,
} from "native-base";
import { IAuth } from "../../interfaces/Auth/IAuth.interface";
import { useDispatch, useSelector } from "react-redux";

import { RootState, persistor } from "../../store/Store";
import AuthService from "../../services/Auth.service";
import { IError } from "../../interfaces/Error/IError.interface";
import { logout } from "../../store/UserSlice";
import { FontAwesome5 } from "@expo/vector-icons";

const ChangePasswordScreen = ({ navigation }: any) => {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const toast = useToast();
  const [passwords, setPasswords] = useState<IAuth.IUpdateMyPassword>({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangePassword = async () => {
    try {
      await AuthService.UpdateCurrentUserPassword(passwords, token ?? "");
      await persistor.purge();

      dispatch(logout());
      navigation.navigate("Login");

      toast.show({
        description: `Password updated! Please login again.`,
        backgroundColor: "success.500",
        borderRadius: "2xl",
        placement: "top",
      });
    } catch (error: any) {
      if (error?.response && error?.response?.data) {
        const errorResponse: IError.IErrorResponse = error.response.data;

        toast.show({
          description: errorResponse.message,
          backgroundColor: "error.400",
          borderRadius: "2xl",
          placement: "top",
        });
      } else {
        console.log("An error occurred:", error);
      }
    }
  };

  const handleInputChange = (
    field: keyof IAuth.IUpdateMyPassword,
    value: string
  ) => {
    setPasswords((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <Center position="relative" flex={1} my={4}>
      <FontAwesome5 name="user-lock" size={54} color={theme.colors.cyan[600]} />
      <Box p={4} width="90%" maxWidth={400}>
        <VStack space={4}>
          <Input
            secureTextEntry
            placeholder="Current Password"
            autoCapitalize="none"
            value={passwords.passwordCurrent}
            onChangeText={(value) =>
              handleInputChange("passwordCurrent", value)
            }
          />
          <Input
            secureTextEntry
            placeholder="New Password"
            autoCapitalize="none"
            value={passwords.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <Input
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            value={passwords.passwordConfirm}
            onChangeText={(value) =>
              handleInputChange("passwordConfirm", value)
            }
          />
          <Button onPress={handleChangePassword}>Change Your Password</Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default ChangePasswordScreen;
