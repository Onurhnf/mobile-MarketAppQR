import {
  Box,
  Center,
  HStack,
  Text,
  Pressable,
  Spacer,
  VStack,
  theme,
  Badge,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { ICart } from "../../interfaces/Cart/ICart.interface";
import CartItemSkeleton from "../Cart/CartItemSkeleton.component";

export default function HistoryContainer({
  carts,
  navigation,
}: {
  carts: ICart.ICartDetail[];
  navigation: any;
}) {
  const skeletonData = [
    {
      component: <CartItemSkeleton />,
      key: "0",
    },
    {
      component: <CartItemSkeleton />,
      key: "1",
    },
  ];
  const [listData, setListData] = useState<ICart.ICartDetail[]>([]);

  useEffect(() => {
    if (carts) {
      setListData(carts);
    }
  }, [carts]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ICart.ICartDetail;
    index: number;
  }) => {
    return listData.length > 0 ? (
      <Box borderBottomWidth="1" borderBottomColor="blueGray.200">
        <Pressable
          onPress={() => console.log("You touched me", index)}
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "gray.50",
          }}
        >
          <Box pl="4" pr="5" py="2">
            <HStack space={3}>
              <VStack>
                <Text
                  color="cyan.600"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                  fontSize="md"
                >
                  {item.marketName}
                </Text>
                <Spacer />

                <Box p={1} backgroundColor="gray.100">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Pieces: {item.products.length}
                  </Text>
                </Box>
              </VStack>
              <Spacer />
              <VStack>
                <Badge
                  colorScheme={
                    item.status !== "purchased" ? "error" : "success"
                  }
                  justifyContent="center"
                  borderRadius={25}
                >
                  {item.status.toUpperCase()}
                </Badge>
                <Spacer />

                <Button
                  variant="outline"
                  size="xs"
                  colorScheme="cyan"
                  onPress={() =>
                    navigation.navigate("History", {
                      totalCost: item.totalCost,
                      products: item.products,
                      marketName: item.marketName,
                    })
                  }
                  borderWidth="1"
                  borderStyle="dotted"
                  borderColor="cyan.600"
                  w="48"
                  mt="2"
                  _text={{ fontWeight: "bold", fontSize: "md" }}
                >
                  Details
                </Button>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    ) : (
      item.component
    );
  };

  return (
    <Center h="full">
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "cyan.600",
        }}
        flex="1"
        minW={"300px"}
        w="100%"
        borderRadius={25}
      >
        <Box bg="white" flex="1">
          <SwipeListView
            endFillColor={theme.colors.blueGray[50]}
            swipeRowStyle={{ backgroundColor: theme.colors.cyan[600] }}
            data={listData.length > 0 ? listData : skeletonData}
            renderItem={renderItem}
          />
        </Box>
      </Box>
    </Center>
  );
}
