export interface UserType {
  userName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}
export interface InitialState {
  data: UserType;
  status: Status;
  error: null | string;
  token: string | null;
  email: string;
}
export enum Status {
  SUCCESS = "success",
  LOADING = "loading",
  ERROR = "error",
}
