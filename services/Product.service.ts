import { Endpoints } from "../enums/api/Endpoints";
import { IProduct } from "../interfaces/Product/IProduct.interface";
import Http from "../utils/Http";

const ProductService = {
  GetProduct: async (
    productId: string,
    token: string | null
  ): Promise<{ data: IProduct.IGetProductResponse }> => {
    const endpoint = Endpoints.GetProduct.replace(":productId", productId);

    const result = await Http.GET(endpoint, null, {
      Authorization: `Bearer ${token}`,
    });

    return result;
  },
};

export default ProductService;
