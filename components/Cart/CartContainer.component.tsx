import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Text,
  Pressable,
  Spacer,
  VStack,
  theme,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItemSkeleton from "./CartItemSkeleton.component";
import { ICart } from "../../interfaces/Cart/ICart.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import CartService from "../../services/Cart.service";
import { IError } from "../../interfaces/Error/IError.interface";

export default function CartContainer() {
  const toast = useToast();
  const { cartData, cartId } = useSelector((state: RootState) => state.cart);
  const { token } = useSelector((state: RootState) => state.user);

  const skeletonData = [
    {
      component: <CartItemSkeleton />,
      key: "0",
    },
  ];
  const [listData, setListData] = useState<ICart.IProductInCart[]>([]);

  useEffect(() => {
    if (cartData) {
      setListData(cartData);
    }
  }, [cartData]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  async function handleDeleteOneFromCart(itemid: string) {
    try {
      const result = await CartService.DeleteOneFromCart(
        cartId ?? "",
        token ?? "",
        itemid
      );
      setListData(result.data.data.cart.products);
    } catch (error: any) {
      console.log(error?.response?.data.message);

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

  const deleteRow = (rowMap: any, rowKey: any, itemid: string) => {
    handleDeleteOneFromCart(itemid);

    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item: any) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ICart.IProductInCart;
    index: number;
  }) => {
    return listData.length > 0 ? (
      <Box>
        <Pressable
          onPress={() => console.log("You touched me", index)}
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "white",
          }}
        >
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <Avatar size="48px" />
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                >
                  {item.productName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Qty: {item.quantity}
                </Text>
              </VStack>
              <Spacer />
              <VStack flex={1} space="1">
                <Text
                  fontSize="sm"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  alignSelf="flex-start"
                >
                  ${item.price}
                </Text>
                {item.quantity > 1 && (
                  <Text
                    fontSize="sm"
                    bold
                    color="coolGray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    alignSelf="flex-start"
                  >
                    Total: ${item.price * item.quantity}
                  </Text>
                )}
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    ) : (
      item.component
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <HStack flex="1" pl="2" justifyContent="flex-end">
        <Pressable
          w="70"
          bg="error.400"
          justifyContent="center"
          onPress={() => deleteRow(rowMap, data.item.key, data.item._id)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  };

  return (
    <Center h="290px">
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "cyan.600",
        }}
        flex="1"
        maxW="400px"
        minW={"300px"}
        w="100%"
        borderRadius={25}
      >
        <Heading color="dark.200" p="4" pb="3" size="lg">
          Cart
        </Heading>

        <Box bg="white" flex="1">
          <SwipeListView
            endFillColor={theme.colors.blueGray[50]}
            swipeRowStyle={{ backgroundColor: theme.colors.cyan[600] }}
            data={listData.length > 0 ? listData : skeletonData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-70}
            previewRowKey="0"
            previewOpenValue={-50}
            previewOpenDelay={1000}
            onRowDidOpen={onRowDidOpen}
          />
        </Box>
      </Box>
    </Center>
  );
}
