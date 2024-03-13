import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { Header } from '../Header/Header'
// import { Footer } from '../Footer/Footer'
import { useCustomHook } from "../../hooks/myCustomHook";

import "./Layout.css";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";

import classes from "./Layout.module.css";

export const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const { Header, Content, Footer, Sider } = Layout;
  // custom hook
  // const value = useCustomHook('change value to custom hook')

  // console.log("🚀 ~ Layout ~ value:", value)

  // useEffect(() => {
  //   alert('Component mount')
  // }, [number])

  const increment = () => {
    // let _number = number
    setNumber(number + 1);
  };

  // useMemo
  // useCallback

  // const memoMethod = useMemo(() => {
  //   return 'any value'
  // })

  // const callbackMethod = useCallback(() => {
  //   return 'any value'
  // })

  const textareaRef = useRef();

  const menuItems = [
    { id: 1, label: "Главная", key: 1, link: "/" },
    { id: 2, label: "Инфо", key: 2, link: "/info" },
    { id: 3, label: "Пользователь", key: 3, link: "/user" },
    { id: 4, label: "Вход/Регистрация", key: 4, link: "/auth" },
  ];

  const handleNavigate = (key) => {
    let link = menuItems.find((item) => item.key == key);

    if (link) {
      navigate(link.link);
    }
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          items={menuItems}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => handleNavigate(key)}
        />
      </Header>
      {/* <div>
        <p>
          <button>-</button> Value : {value}{" "}
          <button onClick={() => incrementStoreValue(value + 1)}>+</button>
        </p>
      </div> */}
      <Content>
        <Layout>
          <Sider theme="light">
            <Menu items={menuItems} />
          </Sider>
          <Content
            style={{ height: "100vh", overflowY: "auto", margin: "0 auto" }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
