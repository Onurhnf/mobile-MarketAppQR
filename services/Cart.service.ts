import { Endpoints } from "../enums/api/Endpoints";
import { ICart } from "../interfaces/Cart/ICart.interface";
import Http from "../utils/Http";

const CartService = {
  AddItemToTheCart: async (
    cartId: string,
    addedItem: any,
    token: string
  ): Promise<{ data: ICart.ICartCreateResponse }> => {
    const endpoint = Endpoints.AddItemToTheCart.replace(":cartId", cartId);

    const result = await Http.POST(
      endpoint,
      { ...addedItem },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return result;
  },
  PurchaseCart: async (
    cartId: string,
    token: string
  ): Promise<{ data: ICart.ICartBuyOrDrop }> => {
    const endpoint = Endpoints.PurchaseCart.replace(":cartId", cartId);

    const result = await Http.POST(endpoint, null, {
      Authorization: `Bearer ${token}`,
    });
    return result;
  },
  DeclineCart: async (
    cartId: string,
    token: string
  ): Promise<{ data: ICart.ICartBuyOrDrop }> => {
    const endpoint = Endpoints.DeclineCart.replace(":cartId", cartId);

    const result = await Http.POST(endpoint, null, {
      Authorization: `Bearer ${token}`,
    });
    return result;
  },
  DeleteOneFromCart: async (
    cartId: string,
    token: string,
    itemid: string
  ): Promise<{ data: ICart.ICartCreateResponse }> => {
    const endpoint = Endpoints.DeleteOneFromCart.replace(":cartId", cartId);

    const result = await Http.DELETE(
      endpoint,
      { itemid },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return result;
  },
  CreateCart: async (
    marketId: string,
    token: string
  ): Promise<{ data: ICart.ICartCreateResponse }> => {
    const result = await Http.POST(
      Endpoints.CreateCart,
      { marketId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return result;
  },
  GetCartHistory: async (
    token: string
  ): Promise<{ data: ICart.IHistoryResponse }> => {
    const result = await Http.GET(Endpoints.GetCartHistory, null, {
      Authorization: `Bearer ${token}`,
    });
    return result;
  },
};

export default CartService;
