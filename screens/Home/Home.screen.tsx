import {
  Box,
  Text,
  HStack,
  Heading,
  VStack,
  Button,
  View,
  useToast,
  useTheme,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import MarketService from "../../services/Market.service";
import { IError } from "../../interfaces/Error/IError.interface";
import { marketFaund, setMarketId } from "../../store/MarketSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CartService from "../../services/Cart.service";
import { setCartId } from "../../store/Cartslice";

export default function Home({ navigation }: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const toast = useToast();
  const { token } = useSelector((state: RootState) => state.user);
  const { isMarketFound, marketID } = useSelector(
    (state: RootState) => state.market
  );

  async function handleGetMarket(id: string) {
    try {
      const result = await MarketService.GetMarket(id, token ?? "");

      dispatch(marketFaund(result.data.data));

      toast.show({
        description: `Success! Welcome to ${result.data.data.name}`,
        backgroundColor: "success.500",
        borderRadius: "2xl",
        placement: "top",
      });
      await handleCreateCart(marketID ?? "");
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
  }

  async function handleCreateCart(marketId: string) {
    try {
      const result = await CartService.CreateCart(marketId, token ?? "");

      dispatch(setCartId(result.data.data.cart._id));

      toast.show({
        description: `Your cart has been created!`,
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
  }

  useEffect(() => {
    if (marketID) {
      handleGetMarket(marketID);
    }
  }, [marketID]);

  return (
    <VStack mb={16} mt={24} space={10} alignItems="center">
      <View>
        <Heading textAlign="center" size="xl">
          Scan Market QR to Get
        </Heading>
        <Heading textAlign="center" fontWeight="extrabold" size="2xl">
          STARTED
        </Heading>
      </View>
      <VStack space={2} alignItems="center">
        <HStack>
          <Text fontSize="lg" bold>
            Press
          </Text>
          <Text fontSize="lg"> the</Text>
        </HStack>
        <Box
          px={2}
          py={1}
          _dark={{ bg: "blueGray.800" }}
          _light={{ bg: "blueGray.200" }}
        >
          QR Button
        </Box>
        <Text fontSize="lg" fontWeight="bold">
          to start fast shopping!
        </Text>
      </VStack>

      <Button
        onPress={() => navigation.navigate("Scanner")}
        borderRadius={25}
        borderWidth={3}
        colorScheme="cyan"
        shadow={5}
        startIcon={
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={65}
            color={theme.colors.dark[200]}
          />
        }
      ></Button>
    </VStack>
  );
}
