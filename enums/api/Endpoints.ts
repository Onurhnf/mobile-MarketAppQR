import { api } from "../../utils/Helpers";

export const Endpoints = {
  /**
   * Auth
   */
  Login: api("/users/login"),
  SignUp: api("/users/signup"),

  /**
   * Market
   */
  GetMarket: api("/markets/"), //id
};
