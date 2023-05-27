import {
  Button,
  Center,
  HStack,
  Text,
  Modal,
  VStack,
  Box,
  useTheme,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import CartService from "../../services/Cart.service";
import { useDispatch, useSelector } from "react-redux";
import { IError } from "../../interfaces/Error/IError.interface";
import { setCart } from "../../store/Cartslice";
import { RootState } from "../../store/Store";
import { clearProductError, removeProduct } from "../../store/ProductSlice";

export default function AddProductModal() {
  const [showModal, setShowModal] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const { productError, productName, productId } = useSelector(
    (state: RootState) => state.product
  );
  const { cartData, cartId } = useSelector((state: RootState) => state.cart);

  const [addedItem, setAddedItem] = useState({
    barkod: "111",
    quantity: 1,
  });

  const theme = useTheme();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (productError) {
      toast.show({
        description: productError,
        backgroundColor: "error.400",
        borderRadius: "2xl",
        placement: "top",
      });
      dispatch(clearProductError());
    }
  }, [productError]);

  useEffect(() => {
    if (productName) {
      setShowModal(true);
      setAddedItem((prev) => ({
        ...prev,
        barkod: productId ?? "",
      }));
      dispatch(clearProductError());
    }
  }, [productName]);

  async function handleAddItemToCart() {
    try {
      const result = await CartService.AddItemToTheCart(
        cartId ?? "",
        addedItem,
        token ?? ""
      );

      dispatch(setCart(result.data.data.cart.products));
      dispatch(removeProduct());

      toast.show({
        description: `Successfully added!`,
        backgroundColor: "success.500",
        borderRadius: "2xl",
        placement: "top",
      });
    } catch (error: any) {
      dispatch(removeProduct());
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
    <Center>
      <Modal bg="#0008" isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content borderRadius={30} bg="muted.800" maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header
            _text={{ color: "muted.200" }}
            bg="muted.800"
            borderColor="trueGray.700"
          >
            Add Product
          </Modal.Header>
          <Modal.Body>
            <Box flex={1}>
              <HStack alignItems="center" justifyContent="space-evenly">
                <Text color="muted.300">{productName}</Text>
                <VStack space={3} alignItems="center" maxWidth="1/5">
                  <Button
                    width="full"
                    borderRadius={10}
                    borderColor="cyan.600"
                    variant="outline"
                    colorScheme="cyan"
                    onPress={() =>
                      setAddedItem((prev) => ({
                        ...prev,
                        quantity:
                          prev.quantity === 10
                            ? prev.quantity
                            : prev.quantity + 1,
                      }))
                    }
                    startIcon={
                      <Entypo
                        name="arrow-up"
                        size={12}
                        color={theme.colors.cyan[500]}
                      />
                    }
                  />
                  <Text bold color="muted.200">
                    {addedItem.quantity}
                  </Text>
                  <Button
                    width="full"
                    borderRadius={10}
                    variant="outline"
                    borderColor="cyan.600"
                    colorScheme="cyan"
                    onPress={() =>
                      setAddedItem((prev) => ({
                        ...prev,
                        quantity:
                          prev.quantity === 1
                            ? prev.quantity
                            : prev.quantity - 1,
                      }))
                    }
                    startIcon={
                      <Entypo
                        name="arrow-down"
                        size={12}
                        color={theme.colors.cyan[500]}
                      />
                    }
                  />
                </VStack>
              </HStack>
            </Box>
          </Modal.Body>
          <Modal.Footer borderColor="trueGray.700" bg="muted.800">
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="cyan"
                onPress={() => {
                  setShowModal(false);
                  dispatch(removeProduct());
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="cyan"
                onPress={() => {
                  setShowModal(false);
                  handleAddItemToCart();
                }}
              >
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
