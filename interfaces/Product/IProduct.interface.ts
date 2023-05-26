export namespace IProduct {
  export interface IData {
    _id: string;
    name: string;
    __v: number;
  }

  export interface IGetProductResponse {
    status: string;
    data: IData;
  }
}
