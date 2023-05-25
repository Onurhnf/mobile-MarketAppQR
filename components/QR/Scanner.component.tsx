import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner, BarCodeScannedCallback } from "expo-barcode-scanner";
import { Center } from "native-base";
import { useDispatch } from "react-redux";
import { setMarketId } from "../../store/MarketSlice";

export default function Scanner({ route, navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);
    dispatch(setMarketId(data));
    navigation.goBack();
  };

  if (hasPermission === null) {
    return (
      <Center>
        <Text>Requesting for camera permission</Text>
      </Center>
    );
  }
  if (hasPermission === false) {
    return (
      <Center>
        <Text>No access to camera</Text>
      </Center>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
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
