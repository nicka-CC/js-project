import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Calendar,
  Typography,
  Space,
  Avatar,
  Badge,
  Select,
  Row,
  Col,
} from "antd";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";

import { faker } from "@faker-js/faker";
import { useLazyUploadAvatarQuery } from "../../services/userService/userService";
import { Navigate, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const RightSidebar = () => {
  const { posts } = useSelector((state) => state.postReducer);
  console.log(posts);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

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
  return (
    <div
      style={{
        padding: "40px",
        width: "460px",
        margin: "5px 5px 5px 0px",
        borderRadius: "0px 20px 20px 0px",
        background: "var(--rightslide-background-color)",
        overflowY: "auto",
      }}
    >
      <div
        onClick={() => navigate("/dashboard/account")}
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
            {/* <input
              name="upload_avatar"
              id="upload_avatar"
              hidden
              type="file"
              onChange={(el) => setAvatarFile(el.target.files)}
              placeholder={"Upload"}
            /> */}
          </label>
          {/* {avatar && avatar.length > 0 && (
            <Button onClick={() => sendUploadAvatar()}>Upload</Button>
          )} */}
        </div>
      </div>
      <div>
        <Title
          level={3}
          style={{ color: "var(--primary-color)", fontWeight: "800" }}
        >{`${new Date().getDate()}, ${new Date().getFullYear()} `}</Title>
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
              return <Badge status={"success"} text={""} />;
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
      </div>

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
            style={{ color: "var(--primary-color)", fontWeight: "800" }}
          >
            {" "}
            Users online
          </Title>
          <Button
            type="link"
            style={{
              color: "var(--primary-color)",
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            {" "}
            See all
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {mock_users.map((user, index) => {
            return (
              <div style={{ display: "flex", gap: "6px" }}>
                <Avatar size={50} icon={<IoPerson />} src={user.avatar} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={{ fontSize: "18px" }}>{user.name}</Text>
                  <Text>{user.number}</Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
