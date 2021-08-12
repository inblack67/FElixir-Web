export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface ICurrentUser {
  email: string;
  inserted_at: string;
  username: string;
  name: string;
}

export interface IGetMeResponse {
  success: boolean;
  data: ICurrentUser;
}

export interface IAcknowledgementResponse {
  success: boolean;
  message: string;
  errors?: string[];
}
