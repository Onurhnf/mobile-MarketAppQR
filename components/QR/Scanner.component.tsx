import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { Center, Text, useToast, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { forgetMarket, setMarketId } from "../../store/MarketSlice";
import { AppDispatch, RootState } from "../../store/Store";
import { getProduct } from "../../store/ProductSlice";
import { emptyCart } from "../../store/Cartslice";
import CartService from "../../services/Cart.service";
import { IError } from "../../interfaces/Error/IError.interface";
import LottieView from "lottie-react-native";

export default function Scanner({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isMarketFound } = useSelector((state: RootState) => state.market);
  const { token } = useSelector((state: RootState) => state.user);
  const toast = useToast();
  const { cartId } = useSelector((state: RootState) => state.cart);

  const [animationVisible, setAnimationVisible] = useState(false);
  const handleAddItemToCart = (productId: string) => {
    dispatch(getProduct({ productId, token }));
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);
    !isMarketFound ? dispatch(setMarketId(data)) : handleSplit(data);
    navigation.goBack();
  };
  function handleSplit(data: any) {
    if (data.includes("-exit")) {
      const [item, rest] = data.split("-exit");
      handlePurchase();
    } else {
      handleAddItemToCart(data);
    }
  }

  async function handlePurchase() {
    try {
      await CartService.PurchaseCart(cartId ?? "", token ?? "");
      setAnimationVisible(true);
      setTimeout(() => {
        dispatch(forgetMarket());
        dispatch(emptyCart());
      }, 2000);

      toast.show({
        description:
          "Thanks for being a part of the seamless shopping experience!",
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

  if (hasPermission === null) {
    return (
      <Center>
        <Text fontSize="lg">Requesting for camera permission</Text>
      </Center>
    );
  }
  if (hasPermission === false) {
    return (
      <Center>
        <Text fontSize="lg">No access to camera</Text>
      </Center>
    );
  }

  return (
    <View style={styles.container}>
      {animationVisible ? (
        <View position="relative" zIndex={10} alignItems="center" w="full">
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
        </View>
      ) : (
        <></>
      )}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
