import { Endpoints } from "../enums/api/Endpoints";
import { IMarket } from "../interfaces/Market/IMarket.interface";
import Http from "../utils/Http";

const MarketService = {
  GetMarket: async (
    id: string,
    token: string
  ): Promise<{ data: IMarket.IMarketResponse }> => {
    const endpoint = Endpoints.GetMarket.replace(":id", id);

    const result = await Http.GET(endpoint, null, {
      Authorization: `Bearer ${token}`,
    });
    return result;
  },
};

export default MarketService;
