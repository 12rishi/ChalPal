import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Status, UserType } from "../types/type";
import { AppDispatch } from "./store";
import { API } from "../services/http";

// const initialState: InitialState = {
//   data: {
//     userName: null,
//     email: null,
//     password: null,
//     confirmPassword: null,
//   },
// status:null
// };
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: {} as UserType,
    status: Status.LOADING,
    error: null,
    token: null,
    email: "",
  },
  reducers: {
    setUserData(state: InitialState, action: PayloadAction<UserType>) {
      state.data = action.payload;
    },
    setStatus(state: InitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setError(state: InitialState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setToken(state: InitialState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setEmail(state: InitialState, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});
export const { setUserData, setStatus, setError, setToken, setEmail } =
  userSlice.actions;
export default userSlice.reducer;
export function registerUser(data: UserType) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("register", data);
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      dispatch(setError(error?.message));
      console.log(error);
    }
  };
}
export function loginUser(data: UserType) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("login", data);
      if (response.status == 200) {
        dispatch(setStatus(Status.SUCCESS));
        if (response?.data && response?.data?.data) {
          dispatch(setUserData(response?.data?.data));
          dispatch(setToken(response.data.token));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      dispatch(setError(error?.message));
    }
  };
}
