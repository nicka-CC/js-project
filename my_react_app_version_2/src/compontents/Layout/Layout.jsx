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

import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

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
      label: "Настройки",
      key: 5,
      link: "/auth",
      icon: <IoSettings size={18} />,
    },
  ];

  const { posts } = useSelector((state) => state.postReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  const createRandomUser = () => {
    return {
      id: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      number: faker.number.int(),
    };
  };

  const [avatar, setAvatarFile] = useState();

  const [uploadAvatar] = useLazyUploadAvatarQuery();

  const sendUploadAvatar = () => {
    let formData = new FormData();

    formData.append("file", avatar[0]);
    formData.append("user", JSON.stringify(user));
    uploadAvatar(formData);
  };

  const mock_users = faker.helpers.multiple(createRandomUser, {
    count: 5,
  });

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
            width: "460px",
            padding: "40px",
            background: "var(--rightslide-background-color)",
            margin: "5px 5px 5px 0px",
            borderRadius: "0px 20px 20px 0px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              justifyContent: "end",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text
                level={4}
                style={{
                  marginBottom: 0,
                  lineHeight: 1,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {user.name}
              </Typography.Text>
              <Typography.Text>{user.email}</Typography.Text>
            </div>
            <div>
              <label htmlFor="upload_avatar">
                <Avatar
                  size={42}
                  src={`http://localhost:3555/uploads/${user.avatar}`}
                ></Avatar>
                <input
                  name="upload_avatar"
                  id="upload_avatar"
                  hidden
                  type="file"
                  onChange={(el) => setAvatarFile(el.target.files)}
                  placeholder={"Upload"}
                />
              </label>
              {avatar && avatar.length > 0 && (
                <Button onClick={() => sendUploadAvatar()}>Upload</Button>
              )}
            </div>
          </div>
          <Title
            style={{ color: "var(--primary-color)", fontWeight: "600" }}
          >{`${new Date().getUTCDate()}, ${new Date().getUTCFullYear()}`}</Title>

          <Calendar
            fullscreen={false}
            mode="month"
            cellRender={(value) => {
              let dates = [];
              for (let obj of posts) {
                for (let key in obj) {
                  for (let day in obj[key]) {
                    if (obj[key][day].length > 0) {
                      dates.push(day.split(",")[1]);
                    }
                  }
                }
              }

              if (dates.includes(value.format("DD.MM.YYYY"))) {
                return <Badge status={"success"} text={""}></Badge>;
              } else {
                return <Badge />;
              }
            }}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];

              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }
              const month = value.month();

              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className="month-item">
                    {months[i]}
                  </Select.Option>
                );
              }

              return (
                <div style={{ padding: 8 }}>
                  <Row gutter={8}>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
          ></Calendar>

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
              {mock_users.map((user, index) => {
                return (
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Avatar size={50} icon={<IoPerson />} src={user.avatar} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Text>{user.name}</Text>
                      <Text>{user.number}</Text>
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
