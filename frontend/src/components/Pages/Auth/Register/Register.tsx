import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { registerUser, setEmail, setStatus } from "../../../../store/userSlice";
import { Status, UserType } from "../../../../types/type";
import Form from "../Form/Form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { status, email } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();
  const submitRegisterData = (data: UserType) => {
    dispatch(setEmail(data.email));
    dispatch(registerUser(data));
  };
  useEffect(() => {
    if (status === Status.SUCCESS) {
      dispatch(setStatus(Status.LOADING));
      navigate(`/verify/${email}`);
    }
  }, [status, dispatch, email]);
  return <Form type="register" onSubmit={submitRegisterData} />;
};

export default Register;
