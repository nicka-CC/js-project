import { Input, Typography, Button, Card, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyLoginUserQuery } from "../../services/userService/userService";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/reducer/userSlice/userSlice";

export const LoginPage = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [loginUser] = useLazyLoginUserQuery();
  const [messageApi, contexHolder] = message.useMessage();
  const dispath = useDispatch();

  const methodLoginUser = () => {
    if (!email || !password) {
      messageApi.error({
        content: "Поля обязательны!",
      });
    } else {
      loginUser({ email, password })
        .unwrap()
        .then((res) => {
          if (res?.ok) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            dispath(setUser({ user: res.user }));
            dispath(setToken({ user: res.token }));
            navigate("/dashboard");
          }
        });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <div
          style={{
            width: "450px",
            minHeight: "250px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography.Title>Авторизация</Typography.Title>
          </div>
          <div>
            <Typography.Text onClick={() => {}}>
              Если вы не зарегестрировались, то вам
              <Typography.Link onClick={() => navigate("/auth/reg")}>
                {" "}
                сюда
              </Typography.Link>
              . А если вы забыли пароль, то вам{" "}
              <Typography.Link onClick={() => navigate("/auth/login")}>
                {" "}
                сюда
              </Typography.Link>
            </Typography.Text>
          </div>
          <div>
            Email
            <Input
              name="email"
              placeholder="email"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
            />
          </div>
          <div>
            Пароль
            <Input.Password
              placeholder="password"
              value={password}
              onChange={(el) => setPassword(el.target.value)}
            />
          </div>

          <div>
            <Button title="" onClick={() => methodLoginUser()}>
              Войти
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
