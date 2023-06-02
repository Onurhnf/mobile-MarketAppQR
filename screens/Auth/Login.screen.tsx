import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  useToast,
  Image,
} from "native-base";
import AuthService from "../../services/Auth.service";
import { IError } from "../../interfaces/Error/IError.interface";
import { IAuth } from "../../interfaces/Auth/IAuth.interface";
import { useDispatch } from "react-redux";
import { login, setUserData } from "../../store/UserSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen: React.FC = ({ navigation }: any) => {
  const imagePath = require("../../assets/logoo1.png");
  const toast = useToast();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<IAuth.ILogin>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const result = await AuthService.Login(credentials);
      dispatch(login(result.data.token));
      dispatch(setUserData(result.data.data.user));

      toast.show({
        description: `Wellcome ${result.data.data.user.name}!`,
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
    <Center
      flex={1}
      _dark={{ bg: "blueGray.800" }}
      _light={{ bg: "blueGray.100" }}
    >
      <Box
        position="relative"
        w={"full"}
        marginBottom={10}
        alignItems={"center"}
      >
        <Image
          position="absolute"
          source={imagePath}
          style={{ width: 115, height: 115, resizeMode: "contain" }}
          alt="Your Image"
        />
      </Box>

      <Box p="2" py="8" mt="10" w="90%" maxW="290">
        <Heading
          size="xl"
          fontWeight="600"
          color="cyan.600"
          bold
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Login to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                bold: true,
              }}
            >
              E-mail
            </FormControl.Label>
            <Input
              placeholder="example@mail.com"
              autoCapitalize="none"
              value={credentials.email}
              onChangeText={(text) => {
                const trimmedText = text.trim();
                setCredentials({ ...credentials, email: trimmedText });
              }}
            />
          </FormControl>
          <FormControl>
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
              value={credentials.password}
              autoCapitalize="none"
              onChangeText={(text) =>
                setCredentials({ ...credentials, password: text })
              }
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "primary.700",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            endIcon={
              <MaterialCommunityIcons name="login" size={24} color="white" />
            }
            mt="2"
            colorScheme="cyan"
            onPress={handleLogin}
          >
            Login
          </Button>
          <HStack mt="6" space={2} justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.
            </Text>
            <Link
              onPress={() => navigation.navigate("Sign Up")}
              _text={{
                color: "primary.700",
                fontWeight: "medium",
                fontSize: "sm",
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
