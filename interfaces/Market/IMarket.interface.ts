export namespace IMarket {
  export interface IMarketDetail {
    _id: string;
    name: string;
    adress: string;
    __v: number;
    qRCodeImage: string;
  }

  export interface IMarketResponse {
    status: string;
    data: IMarketDetail;
  }
}
