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
import AddProductModal from "../../components/Cart/AddProductModal.component";
import CartContainer from "../../components/Cart/CartContainer.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CartHome({ navigation }: any) {
  const dispatch = useDispatch();

  const theme = useTheme();
  const toast = useToast();
  const { token } = useSelector((state: RootState) => state.user);
  const { barkod, cartData, cartId } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    if (barkod) {
      // handleAddItemToCart();
    }
  }, [barkod]);

  return (
    <VStack mb={16} mt={24} space={10} alignItems="center">
      <View>
        <Heading textAlign="center" size="xl">
          Scan ITEM QR to Get
        </Heading>
      </View>
      <VStack alignItems="center" space="2xl">
        <CartContainer />
        <Button
          onPress={() => navigation.navigate("Scanner")}
          borderRadius={25}
          borderWidth={3}
          colorScheme="cyan"
          shadow={5}
          startIcon={
            <MaterialCommunityIcons
              name="barcode-scan"
              size={65}
              color={theme.colors.dark[200]}
            />
          }
        ></Button>
      </VStack>

      <AddProductModal />
    </VStack>
  );
}
