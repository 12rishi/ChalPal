import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home/Home";

import { Provider } from "react-redux";
import store from "./store/store";
import HOC from "./components/HOC/HOC";

import { useAppSelector } from "./store/hook";
import { OTP } from "./components/Pages/Auth/OTPPage/OTP";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner/Spinner";
const Register = lazy(
  () => import("./components/Pages/Auth/Register/Register")
);
const Login = lazy(() => import("./components/Pages/Auth/Login/Login"));
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <AppComponent />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </>
  );
}
function AppComponent() {
  const { email } = useAppSelector((store) => store.users);
  const pathArray = ["/login", "/register", `/verify/${email}`];
  const { pathname } = useLocation();
  console.log(pathname);
  if (pathArray.includes(pathname)) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:email" element={<OTP />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  } else {
    return (
      <HOC>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HOC>
    );
  }
}
export default App;
