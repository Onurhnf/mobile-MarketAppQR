export namespace ICart {
  export interface ICart {
    userId: string;
    marketId: string;
    status: string;
    _id: string;
    products: IProductInCart[];
    __v: number;
  }

  interface IData {
    cart: ICart;
  }

  export interface ICartCreateResponse {
    status: string;
    data: IData;
  }

  export interface IProductInCart {
    component: any;
    marketstockid: string;
    quantity: number;
    _id: string;
    productName: string;
    price: number;
  }
}
