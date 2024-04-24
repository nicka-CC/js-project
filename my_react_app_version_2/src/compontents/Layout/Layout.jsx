import React, { useEffect, useRef, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { Layout, Menu, Button, Calendar, Space, Avatar } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";

import classes from "./Layout.module.css";
import {
  IoHome,
  IoGrid,
  IoPerson,
  IoReader,
  IoLayers,
  IoSettings,
} from "react-icons/io5"; // Или другой подходящий подкаталог, в зависимости от иконки

import { useDispatch, useSelector } from "react-redux";
import {
  resetCouter,
  setCouter,
} from "../../store/reducer/CounterSlice/counterSlice";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

export const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const { Header, Content, Footer, Sider } = Layout;
  const [collapseMenu, setCollapsMenu] = useState(false);

  const menuItems = [
    {
      id: 1,
      label: "Главная",
      key: 1,
      link: "/",
      icon: <IoHome size={18} />,
    },
    {
      id: 2,
      label: "Планшет",
      key: 2,
      link: "/info",
      icon: <IoGrid size={18} />,
    },
    {
      id: 3,
      label: "Все курсы",
      key: 3,
      link: "/user",
      icon: <IoReader size={18} />,
    },
    {
      id: 4,
      label: "Задачи",
      key: 4,
      link: "/auth",
      icon: <IoLayers size={18} />,
    },
    {
      id: 5,
      label: "Настройки",
      key: 5,
      link: "/auth",
      icon: <IoSettings size={18} />,
    },
  ];

  const useronline = [
    { id: Math.ceil(Math.random() * 10), name: "Test user 1", avatar: "" },
    { id: Math.ceil(Math.random() * 10), name: "Test user 2", avatar: "" },
    { id: Math.ceil(Math.random() * 10), name: "Test user 3", avatar: "" },
    { id: Math.ceil(Math.random() * 10), name: "Test user 4", avatar: "" },
  ];

  const footerMenuItems = [
    {
      id: 1,
      label: "Настройки",
      key: 1,
      link: "/auth",
      icon: <IoSettings size={18} />,
    },
  ];

  return (
    <Layout>
      {/* <Content> */}
      <Layout className={classes.layout_container}>
        <div
          className={classes.sidebar}
          style={{
            width: `${collapseMenu ? "80px" : "250px"}`,
          }}
        >
          <div style={{ marginLeft: "25px" }}>
            <Button
              icon={<GiHamburgerMenu size={18} />}
              onClick={() => setCollapsMenu(!collapseMenu)}
            />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["2"]}
            defaultOpenKeys={["sub1"]}
            items={menuItems}
            inlineCollapsed={collapseMenu}
            className={classes.sidebarMenu}
          />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["2"]}
            defaultOpenKeys={["sub1"]}
            items={footerMenuItems}
            inlineCollapsed={collapseMenu}
            className={classes.sidebarMenu}
          />
        </div>

        <Content className={classes.content}>
          <Outlet />
        </Content>
        <div
          style={{
            width: "430px",
            padding: "40px",
            background: "var(--rightslide-background-color)",
            margin: "5px 5px 5px 0px",
            borderRadius: "0px 20px 20px 0px",
          }}
        >
          <Title
            style={{ color: "var(--primary-color)", fontWeight: "600" }}
          >{`${new Date().getUTCDate()}, ${new Date().getUTCFullYear()}`}</Title>

          <Calendar fullscreen={false} />
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Title
                level={3}
                style={{ color: "var(--primary-color)", fontWeight: "600" }}
              >
                Online Users:
              </Title>
              <Button
                type="link"
                level={5}
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "400",
                  fontSize: "18px",
                }}
              >
                See all:
              </Button>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {useronline.map((user, index) => {
                return (
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Avatar size={50} icon={<IoPerson />} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Text>{user.name}</Text>
                      <Text>{user.id}</Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
      {/* </Content> */}
    </Layout>
  );
};
