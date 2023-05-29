import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function PurchaseScreen({ route, navigation }: any) {
  const { totalCost } = route.params;

  return (
    <>
      <Center
        flex={1}
        _dark={{ bg: "blueGray.800" }}
        _light={{ bg: "blueGray.100" }}
      >
        <Box p="2" py="8" w="90%" maxW="290">
          <VStack space={3} mt="5" alignItems="center">
            <FontAwesome name="credit-card-alt" size={54} color="black" />
            <FormControl>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                CARD NUMBER
              </FormControl.Label>
              <Input
                placeholder="1234 1234 1234 1234"
                autoCapitalie="none"
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                CARD HOLDER NAME
              </FormControl.Label>
              <Input
                placeholder="Onur Can Kaan"
                keyboardType="name-phone-pad"
              />
            </FormControl>
            <FormControl>
              <HStack justifyContent="space-between">
                <Input
                  placeholder="Day"
                  keyboardType="numeric"
                  w="1/4"
                />
                <Input
                  placeholder="Month"
                  keyboardType="numeric"
                  w="1/4"
                />
                <Input
                  keyboardType="numeric"
                  placeholder="CVV"
                  w="1/4"
                />
              </HStack>
            </FormControl>
            <Button
              mt="2"
              colorScheme="cyan"
              w="full"
              onPress={() => {
                navigation.navigate("Scanner");
              }}
            >
              <Text bold fontSize="lg" color="white">
                COMPLATE
              </Text>
            </Button>
            <Text bold fontSize="lg">
              Total Cost: ${totalCost}
            </Text>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
