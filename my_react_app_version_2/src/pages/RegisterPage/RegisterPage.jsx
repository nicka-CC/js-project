import { Input, Typography, Button, Card, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyRegisterUserQuery } from "../../services/userService/userService";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [createUser] = useLazyRegisterUserQuery();
  const [messageApi, contexHolder] = message.useMessage();
  const methodRegisterUser = () => {
    if (!email || !name || !password) {
      messageApi.error({
        content: "Error",
      });
    } else {
      createUser({ email, name, password });
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
      {contexHolder}
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
            <Typography.Title>Регистрация</Typography.Title>
          </div>
          <div>
            <Typography.Text onClick={() => {}}>
              Если вы зарегестрировались, то вам
              <Typography.Link onClick={() => navigate("/auth/login")}>
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
            Имя
            <Input
              placeholder="name"
              value={name}
              onChange={(el) => setName(el.target.value)}
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
            <Button title="" onClick={() => methodRegisterUser()}>
              Зарегестрироваться
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
