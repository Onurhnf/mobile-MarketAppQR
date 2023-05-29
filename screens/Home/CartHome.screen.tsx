import {
  HStack,
  Heading,
  VStack,
  Button,
  View,
  useToast,
  useTheme,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import AddProductModal from "../../components/Modal/AddProductModal.component";
import CartContainer from "../../components/Cart/CartContainer.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LottieView from "lottie-react-native";
import CartService from "../../services/Cart.service";
import RemoveCartModal from "../../components/Modal/RemoveCartModal.component";
import { emptyCart } from "../../store/Cartslice";
import { forgetMarket } from "../../store/MarketSlice";
import { IError } from "../../interfaces/Error/IError.interface";
import PurchaseCartModal from "../../components/Modal/PurchaseCartModal.component";

export default function CartHome({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [animationVisible, setAnimationVisible] = useState(false);
  const [removeCart, setRemoveCart] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [purchaseCart, setPurchaseCart] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [totalCost, setTotalCost] = useState<number>();

  const theme = useTheme();
  const toast = useToast();
  const { token } = useSelector((state: RootState) => state.user);
  const { cartData, cartId } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (removeCart) {
      handledecline();
      setRemoveCart(false);
    }
  }, [removeCart]);

  useEffect(() => {
    if (cartData) {
      let total = 0;

      cartData.forEach((product) => {
        total += product.price * product.quantity;
      });
      setTotalCost(total);
    }
  }, [cartData]);

  useEffect(() => {
    if (purchaseCart) {
      navigation.navigate("Purchase", {
        totalCost,
        setPurchaseCart,
      });
    }
  }, [purchaseCart]);

  async function handledecline() {
    try {
      await CartService.DeclineCart(cartId ?? "", token ?? "");
      setAnimationVisible(true);
      setTimeout(() => {
        dispatch(forgetMarket());
        dispatch(emptyCart());
      }, 2000);

      toast.show({
        description: "We appreciate your interest.",
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

  return (
    <>
      <RemoveCartModal
        isRemoveModalOpen={isRemoveModalOpen}
        setIsRemoveModalOpen={setIsRemoveModalOpen}
        setRemoveCart={setRemoveCart}
      />
      <PurchaseCartModal
        isPurchaseModalOpen={isPurchaseModalOpen}
        setIsPurchaseModalOpen={setIsPurchaseModalOpen}
        setPurchaseCart={setPurchaseCart}
        totalCost={totalCost}
      />
      <VStack mb={16} mt={"20%"} space={10} alignItems="center">
        <View position="relative" zIndex={10} alignItems="center" w="full">
          {animationVisible && (
            <View position="absolute" zIndex="999" top="35%">
              <LottieView
                autoPlay
                loop={false}
                style={{
                  width: 200,
                  height: 200,
                }}
                source={require("../../assets/success.json")}
                onAnimationFinish={() => setAnimationVisible(false)}
              />
            </View>
          )}
          <Heading textAlign="center" size="lg">
            Scan Products Barcode
          </Heading>
        </View>
        <VStack position="relative" alignItems="center" space="2xl">
          <CartContainer totalCost={totalCost} setTotalCost={setTotalCost} />
          <HStack
            width="100%"
            position="absolute"
            justifyContent="space-evenly"
            bottom={0}
          >
            <Button
              borderRadius={50}
              variant="subtle"
              borderWidth={2}
              onPress={() => setIsRemoveModalOpen(true)}
              colorScheme="error"
              _text={{ color: theme.colors.dark[200], fontWeight: "bold" }}
              shadow="9"
              startIcon={
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={30}
                  color={theme.colors.dark[200]}
                />
              }
            ></Button>
            <Button
              borderRadius={50}
              borderWidth={2}
              disabled={totalCost ?? 0 > 0 ? false : true}
              onPress={() => setIsPurchaseModalOpen(true)}
              variant="subtle"
              _text={{ color: theme.colors.dark[200], fontWeight: "bold" }}
              colorScheme="emerald"
              shadow="9"
              startIcon={
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={30}
                  color={theme.colors.dark[200]}
                />
              }
            ></Button>
          </HStack>
          <Button
            position="absolute"
            bottom="-15%"
            onPress={() => navigation.navigate("Scanner")}
            borderRadius={25}
            borderWidth={3}
            shadow="9"
            colorScheme="cyan"
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
    </>
  );
}
