import { Endpoints } from "../enums/api/Endpoints";
import { IMarket } from "../interfaces/Market/IMarket.interface";
import Http from "../utils/Http";

const MarketService = {
  GetMarket: async (
    id: string,
    token: string
  ): Promise<{ data: IMarket.IMarketResponse }> => {
    const result = await Http.GET(Endpoints.GetMarket + id, null, {
      Authorization: `Bearer ${token}`,
    });
    return result;
  },
};

export default MarketService;
