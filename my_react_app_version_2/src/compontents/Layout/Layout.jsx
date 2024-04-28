import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "antd";
import { faker } from "@faker-js/faker";
import { useLazyUploadAvatarQuery } from "../../services/userService/userService";

import {
  Layout,
  Menu,
  Button,
  Calendar,
  Avatar,
  Badge,
  Select,
  Row,
  Col,
} from "antd";
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

import RightSidebar from "../RightSidebar/rightSidebar";

export const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  // const [number, setNumber] = useState(0);
  const { Content } = Layout;
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
      label: "Профиль",
      key: 5,
      link: "/account",
      icon: <IoSettings size={18} />,
    },
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
  const handleMenuClick = (e) => {
    const item = menuItems.find((item) => item.key === e.key);
    if (item) {
      navigate(item.link);
    }
  };
  return (
    <Layout>
      {/* <Content> */}
      <Layout className={classes.layout_container}>
        <div
          className={classes.sidebar}
          style={{
            minWidth: `${collapseMenu ? "80px" : "250px"}`,
            maxWidth: `${collapseMenu ? "80px" : "250px"}`,
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
            onClick={handleMenuClick}
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
        <RightSidebar style={{ background: "#fff" }} />
      </Layout>
      {/* </Content> */}
    </Layout>
  );
};
