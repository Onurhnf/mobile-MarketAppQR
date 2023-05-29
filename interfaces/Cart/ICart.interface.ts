export namespace ICart {
  export interface ICartDetail {
    userId: string;
    marketId: string;
    status: string;
    _id: string;
    products: IProductInCart[];
    __v: number;
    totalCost?: number;
    marketName?: string;
    component?: any;
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
    productImage?: string;
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

  export interface IDataHistory {
    carts: ICartDetail[];
  }

  export interface IHistoryResponse {
    status: string;
    data: IDataHistory;
  }
}
