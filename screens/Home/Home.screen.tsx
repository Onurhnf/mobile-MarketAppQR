import {
  Box,
  Text,
  Center,
  HStack,
  Heading,
  Link,
  VStack,
  Button,
  View,
  ScrollView,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import MarketService from "../../services/Market.service";
import { IError } from "../../interfaces/Error/IError.interface";
import { marketFaund, setMarketId } from "../../store/MarketSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home({ navigation }: any) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { token } = useSelector((state: RootState) => state.user);
  const { isMarketFound, marketID } = useSelector(
    (state: RootState) => state.market
  );

  async function handleGetMarket(id: string) {
    try {
      const result = await MarketService.GetMarket(id, token ?? "");

      dispatch(setMarketId(marketID));
      dispatch(marketFaund(result.data.data));

      toast.show({
        description: `Success! Your ${result.data.data.name} cart has been created!`,
        backgroundColor: "success.400",
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
    <Center
      _dark={{ bg: "blueGray.800" }}
      _light={{ bg: "blueGray.100" }}
      px={4}
      flex={1}
    >
      <VStack mb={16} mt={24} space={10} alignItems="center">
        <View>
          <Heading textAlign="center" size="xl">
            Scan Market QR to Get
          </Heading>
          <Heading textAlign="center" fontWeight="extrabold" size="2xl">
            STARTED
          </Heading>
        </View>
        <ScrollView>
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
            <Text>that shown below to create your virtual cart.</Text>
          </VStack>
        </ScrollView>

        <Button
          onPress={() => navigation.navigate("Scanner")}
          borderRadius={25}
          borderWidth={4}
          shadow={5}
          variant="subtle"
          startIcon={
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={54}
              color="black"
            />
          }
        ></Button>
      </VStack>
    </Center>
  );
}
