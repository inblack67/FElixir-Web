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
  name: string;
  username: string;
}

export interface IGetMeResponse {
  success: boolean;
  data: ICurrentUser;
}
