import { Endpoints } from "../enums/api/Endpoints";
import { IAuth } from "../interfaces/Auth/IAuth.interface";
import Http from "../utils/Http";

const AuthService = {
  Login: async (
    formData: IAuth.ILogin
  ): Promise<{ data: IAuth.IAuthResponse }> => {
    const result = await Http.POST(Endpoints.Login, formData);
    return result;
  },
  SignUp: async (
    formData: IAuth.ISignUp
  ): Promise<{ data: IAuth.IAuthResponse }> => {
    const result = await Http.POST(Endpoints.SignUp, formData);
    return result;
  },
  UpdateCurrentUserPassword: async (
    formData: IAuth.IUpdateMyPassword,
    token: string
  ): Promise<{ data: IAuth.IAuthResponse }> => {
    const result = await Http.PATCH(
      Endpoints.UpdateCurrentUserPassowrd,
      { ...formData },

      {
        Authorization: `Bearer ${token}`,
      }
    );
    return result;
  },
};

export default AuthService;
