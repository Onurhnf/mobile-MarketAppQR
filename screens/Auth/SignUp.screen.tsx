import React, { useState } from "react";
import { Platform } from "react-native";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  useToast,
} from "native-base";
import AuthService from "../../services/Auth.service";
import { IError } from "../../interfaces/Error/IError.interface";
import { IAuth } from "../../interfaces/Auth/IAuth.interface";
import { useDispatch } from "react-redux";
import { login, setUserData } from "../../store/UserSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignUpScreen: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [credentials, setCredentials] = useState<IAuth.ISignUp>({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });

  const handleSignUp = async () => {
    try {
      const result = await AuthService.SignUp(credentials);

      dispatch(login(result.data.token));
      dispatch(setUserData(result.data.data.user));

      toast.show({
        description: `Wellcome ${result.data.data.user.name}! Successfully registered!`,
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

  return (
    <KeyboardAvoidingView
      _dark={{ bg: "blueGray.800" }}
      _light={{ bg: "blueGray.100" }}
      h={{
        base: "full",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Center
          flex={1}
          _dark={{ bg: "blueGray.800" }}
          _light={{ bg: "blueGray.100" }}
        >
          <Box mt="4" p="2" w="90%" maxW="290">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Name
                </FormControl.Label>
                <Input
                  placeholder="Name Surname"
                  value={credentials.name}
                  onChangeText={(text) =>
                    setCredentials({ ...credentials, name: text })
                  }
                />
                <FormControl.HelperText
                  _text={{
                    fontSize: "11px",
                    marginBottom: "-2",
                  }}
                >
                  • Name must contain atleast 3 character.
                </FormControl.HelperText>
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Email
                </FormControl.Label>
                <Input
                  placeholder="example@mail.com"
                  autoCapitalize="none"
                  value={credentials.email}
                  onChangeText={(text) =>
                    setCredentials({ ...credentials, email: text })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Password
                </FormControl.Label>
                <Input
                  secureTextEntry
                  placeholder="********"
                  autoCapitalize="none"
                  value={credentials.password}
                  onChangeText={(text) =>
                    setCredentials({ ...credentials, password: text })
                  }
                />
                <FormControl.HelperText
                  _text={{
                    fontSize: "11px",
                    marginBottom: "-2",
                  }}
                >
                  • Password must contain between 6-15 character.
                </FormControl.HelperText>
              </FormControl>

              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Confirm Password
                </FormControl.Label>
                <Input
                  secureTextEntry
                  placeholder="********"
                  autoCapitalize="none"
                  value={credentials.passwordConfirm}
                  onChangeText={(text) =>
                    setCredentials({ ...credentials, passwordConfirm: text })
                  }
                />
              </FormControl>
              <Button
                endIcon={
                  <MaterialCommunityIcons
                    name="draw-pen"
                    size={24}
                    color="white"
                  />
                }
                mt="2"
                colorScheme="cyan"
                onPress={handleSignUp}
              >
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
