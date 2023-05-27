export namespace ICart {
  export interface ICartDetail {
    userId: string;
    marketId: string;
    status: string;
    _id: string;
    products: IProductInCart[];
    __v: number;
  }

  interface IData {
    cart: ICartDetail;
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

  export interface ICartBuyOrDrop {
    status: string;
    message: string;
  }

  export interface Product {
    marketstockid: string;
    quantity: number;
    _id: string;
  }

  interface IDataHistory {
    carts: ICartDetail[];
  }

  export interface IHistoryResponse {
    status: string;
    data: IDataHistory;
  }
}
