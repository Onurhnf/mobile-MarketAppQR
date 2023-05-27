import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Text,
  VStack,
  useToast,
} from "native-base";
import { IAuth } from "../../interfaces/Auth/IAuth.interface";
import { Image } from "native-base";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forgetMarket } from "../../store/MarketSlice";
import { logout } from "../../store/UserSlice";
import { declineCart, emptyCart } from "../../store/Cartslice";
import { removeProduct } from "../../store/ProductSlice";
import { AppDispatch, RootState, persistor } from "../../store/Store";
type UserDetailsScreenProps = {
  user: IAuth.IUser | null;
};

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ user }) => {
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const { cartId } = useSelector((state: RootState) => state.cart);
  const { token } = useSelector((state: RootState) => state.user);
  const imagePath = require("../../assets/logo2.png");

  async function handleLogOut() {
    if (cartId && token) {
      dispatch(declineCart({ cartId, token }));
    }

    dispatch(forgetMarket());
    dispatch(emptyCart());
    dispatch(removeProduct());
    dispatch(logout());
    await persistor.purge();

    toast.show({
      description: "Hope to see you later!",
      backgroundColor: "success.500",
      borderRadius: "2xl",
      placement: "top",
    });
  }

  return (
    <Center position="relative" h="full" w="full" flex={1} my={4}>
      <Image
        position="absolute"
        top="5%"
        source={imagePath}
        style={{ width: 100, height: 100, resizeMode: "contain" }}
        alt="Your Image"
      />
      <Box
        bg="white"
        borderRadius="md"
        p={4}
        shadow={2}
        width="90%"
        maxWidth={400}
      >
        <VStack space={4}>
          {user ? (
            <View>
              <FormControl>
                <FormControl.Label _text={{ fontWeight: "bold" }}>
                  Name: {user.name}
                </FormControl.Label>
              </FormControl>
              <FormControl>
                <FormControl.Label _text={{ fontWeight: "bold" }}>
                  Email: {user.email}
                </FormControl.Label>
              </FormControl>
              <Button
                borderColor="danger.600"
                borderWidth="2"
                _text={{ fontWeight: "bold" }}
                endIcon={
                  <MaterialCommunityIcons name="logout" size={24} color="red" />
                }
                mt="10%"
                colorScheme="danger"
                variant="outline"
                onPress={handleLogOut}
              >
                Logout
              </Button>
            </View>
          ) : (
            <FormControl>
              <FormControl.Label _text={{ fontWeight: "bold" }}>
                No user data available.
              </FormControl.Label>
            </FormControl>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default UserDetailsScreen;
