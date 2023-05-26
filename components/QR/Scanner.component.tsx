import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { Center, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { setMarketId } from "../../store/MarketSlice";
import { AppDispatch, RootState } from "../../store/Store";
import { getProduct } from "../../store/ProductSlice";

export default function Scanner({ route, navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isMarketFound } = useSelector((state: RootState) => state.market);
  const { token } = useSelector((state: RootState) => state.user);

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
    !isMarketFound ? dispatch(setMarketId(data)) : handleAddItemToCart(data);
    navigation.goBack();
  };

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
