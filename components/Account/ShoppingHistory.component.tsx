import { useEffect, useState } from "react";
import CartService from "../../services/Cart.service";
import { Text, VStack, useToast } from "native-base";
import { IError } from "../../interfaces/Error/IError.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import HistoryContainer from "./HistoryContainer.component";
import { ICart } from "../../interfaces/Cart/ICart.interface";

export default function ShoppingHistoryScreen({ navigation }: any) {
  const toast = useToast();
  const { token } = useSelector((state: RootState) => state.user);
  const [carts, setCarts] = useState<ICart.ICartDetail[]>();

  async function handleGetHistory(token: string) {
    try {
      const result = await CartService.GetCartHistory(token);

      setCarts(result.data.data.carts);
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

  useEffect(() => {
    handleGetHistory(token ?? "");
  }, []);

  return (
    <VStack position="relative">
      <HistoryContainer carts={carts ?? []} navigation={navigation} />
    </VStack>
  );
}
