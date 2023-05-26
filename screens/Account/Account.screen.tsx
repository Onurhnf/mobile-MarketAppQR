import {
  Box,
  Text,
  Center,
  HStack,
  Heading,
  VStack,
  Button,
  View,
  ScrollView,
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

export default function AccountScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const toast = useToast();
  const { token } = useSelector((state: RootState) => state.user);
  const { isMarketFound, marketID } = useSelector(
    (state: RootState) => state.market
  );

  return (
    <Center
      _dark={{ bg: "blueGray.800" }}
      _light={{ bg: "blueGray.100" }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Heading size="lg">Welcome to NativeBase</Heading>
        <HStack space={2} alignItems="center">
          <Text>Edit</Text>
          <Box
            _web={{
              _text: {
                fontFamily: "monospace",
                fontSize: "sm",
              },
            }}
            px={2}
            py={1}
            _dark={{ bg: "blueGray.800" }}
            _light={{ bg: "blueGray.200" }}
          >
            App.js
          </Box>
          <Text>and save to reload.</Text>
        </HStack>
      </VStack>
    </Center>
  );
}
