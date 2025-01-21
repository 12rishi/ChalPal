import React, { useEffect } from "react";
import { useAppSelector } from "../../store/hook";
import { useNavigate } from "react-router-dom";

const HOC: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector((store) => store.users);
  const navigate = useNavigate();

  const localToken = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !localToken) {
      navigate("/login");
    }
  });

  return <div>{children}</div>;
};

export default HOC;
