export namespace IError {
  export interface IErrorDetail {
    statusCode: number;
    status: string;
    isOperational: boolean;
  }

  export interface IErrorResponse {
    status: string;
    error: IErrorDetail;
    message: string;
    stack: string;
  }
}
