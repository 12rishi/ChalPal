import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home/Home";
import Register from "./components/Pages/Auth/Register/Register";
import Login from "./components/Pages/Auth/Login/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import HOC from "./components/HOC/HOC";

import { useAppSelector } from "./store/hook";
import { OTP } from "./components/Pages/Auth/OTPPage/OTP";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppComponent />
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
