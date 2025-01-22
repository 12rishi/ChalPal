import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { loginUser, setStatus } from "../../../../store/userSlice";
import { Status, UserType } from "../../../../types/type";
import Form from "../Form/Form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, token } = useAppSelector((store) => store.users);
  const postLoginData = (data: UserType) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS && token) {
      localStorage.setItem("token", token);
      dispatch(setStatus(Status.LOADING));
      navigate("/");
    }
  }, [status, token, dispatch]);
  return <Form type={"login"} submission={postLoginData} />;
};

export default Login;
