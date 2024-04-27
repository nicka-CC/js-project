import logo from "./logo.svg";
import "./App.css";
import { PageLayout } from "./compontents/Layout/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { Home } from "./compontents/Home/Home";
import { Button, Result } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "./store/reducer/userSlice/userSlice";

// import { useSelector } from 'react-redux'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isAdmin = (element) => element //(user.role == 'admin' ? element : <PageError />)

  const getLocalStorageItems = (key) => {
    return localStorage.getItem(key);
  };
  const { user, token } = useSelector((state) => state.userReducer);

  if (Object.keys(user).length === 0 && !token) {
    dispatch(setUser({ user: JSON.parse(getLocalStorageItems("user")) }));
    dispatch(setToken({ token: getLocalStorageItems("token") }));
  }

  const isAuth = (element) =>
    user.id && token ? (
      element
    ) : (
      <Result
        status="403"
        title="403"
        subTitle="Вы не авторизовыны!"
        extra={
          <Button type="primary" onClick={() => navigate("/auth/login")}>
            Авторизоваться
          </Button>
        }
      />
    );
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Result
            status="404"
            title="404"
            subTitle="Такой страницы не существует!"
            // extra={<Button type="primary">Back Home</Button>}
          />
        }
      />
      <Route path="/dashboard/*" element={isAuth(<PageLayout />)}>
        <Route index element={<Home />} />
        <Route path="user" element={<>user</>} />
      </Route>

      <Route path="/auth/">
        {/* <Route index element={<HomeCompnonent posts={data || []} />} /> */}
        <Route path="login" element={<LoginPage />} />
        <Route path="reg" element={<RegisterPage />} />
        {/* <Route path='resetpassword' element={<>user</>} /> */}
      </Route>

      <Route path="/error/" element={<PageLayout />}>
        <Route index element={<>У вас нет роли администратора</>} />
      </Route>
    </Routes>
  );
}

export default App;
