import { api } from "../../utils/Helpers";

export const Endpoints = {
  /**
   * Auth
   */
  Login: api("/users/login"),
  SignUp: api("/users/signup"),
  UpdateCurrentUserPassowrd: api("/users/updateMyPassword"),

  /**
   * Market
   */
  GetMarket: api("/markets/:id"), //

  /**
   * Cart
   */
  CreateCart: api("/carts/create"),
  GetCartHistory: api("/carts/history"),
  AddItemToTheCart: api("/carts/:cartId/add"),
  PurchaseCart: api("/carts/:cartId/purchase"),
  DeclineCart: api("/carts/:cartId/decline"),
  DeleteOneFromCart: api("/carts/:cartId/delete"),

  /**
   * Product
   */
  GetProduct: api("/products/:productId"),
};
