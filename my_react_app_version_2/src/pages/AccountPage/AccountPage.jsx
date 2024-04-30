import { Avatar, Button } from "antd";
import React, { useState } from "react";
import {
  useLazyUpdateLoginQuery,
  useLazyUpdateNumberQuery,
  useLazyUpdateUsernameQuery,
  useLazyUploadAvatarQuery,
} from "../../services/userService/userService";
import { useNavigate } from "react-router-dom";
import { IoAdd, IoArrowDown } from "react-icons/io5";

export const AccountPage = () => {
  const getLocalStorageItems = (key) => {
    return localStorage.getItem(key);
  };

  let user = JSON.parse(getLocalStorageItems("user") || "{}");
  const [changeProfile, setChangeProfile] = useState(false);
  const [avatar, setAvatarFile] = useState(user.avatar);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newName, setNewName] = useState(user.name);
  const [newNumber, setNewNumber] = useState(user.number);
  const navigate = useNavigate();

  const [uploadAvatar] = useLazyUploadAvatarQuery();
  const [updateLogin] = useLazyUpdateLoginQuery();
  const [updateName] = useLazyUpdateUsernameQuery();
  const [updateNumber] = useLazyUpdateNumberQuery();
  const sendUploadAvatar = () => {
    let formData = new FormData();
    formData.append("file", avatar[0]);
    formData.append("user", JSON.stringify(user));
    uploadAvatar(formData);
  };
  const handleUpdateEmail = async () => {
    await updateLogin({ email: user.email, newEmail });
  };
  const handleUpdateName = async () => {
    await updateName({ email: newEmail, newName });
  };
  const handleUpdateNumber = async () => {
    await updateNumber({ email: newEmail, newNumber });
  };
  const handleAllUpdate = async () => {
    await Promise.all([
      handleUpdateName(),
      handleUpdateNumber(),
      handleUpdateEmail(),
      sendUploadAvatar(),
    ]);
  };
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "20px",
        margin: "20px",
      }}
    >
      <div
        style={{
          marginLeft: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <h1>Личный кабинет</h1>
        <Button onClick={() => navigate("/dashboard")}>Назад</Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#DCDCDC",
          margin: "5px 20px",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Avatar
          size={150}
          src={`http://localhost:3555/uploads/${user.avatar}`}
        ></Avatar>
      </div>
      <div
        style={{
          background: "#F0FFFF",
          margin: "5px 20px",
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          // gap: "88%",
        }}
      >
        <div style={{ width: "100%" }}>
          <h1 style={{ display: "flex" }}>
            Вы в личном кабинете,
            <div style={{ color: "#808080" }}>{user.name}</div>!
          </h1>
          <h2 style={{ display: "flex" }}>
            Email: <div style={{ color: "#808080" }}>{user.email}</div>
          </h2>
          <h2 style={{ display: "flex" }}>
            Номер телефона:
            <div style={{ color: "#808080" }}>{user.number}</div>
          </h2>
        </div>
        <Button onClick={() => setChangeProfile(!changeProfile)}>
          Редактировать
        </Button>
      </div>
      {changeProfile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#F5DEB3",
            margin: "5px 20px",
            padding: "20px",
            borderRadius: "20px",
            gap: "6px",
          }}
        >
          <label
            htmlFor="upload_avatar"
            style={{
              display: "flex",
              background: "#FFF8DC",
              borderRadius: "6px",
              padding: "4px",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              size={42}
              src={`http://localhost:3555/uploads/${user.avatar}`}
            ></Avatar>
            <div>Нажмите сюда и выберите новую аватарку</div>
            <input
              name="upload_avatar"
              id="upload_avatar"
              hidden
              type="file"
              onChange={(el) => setAvatarFile(el.target.files)}
              placeholder={"Upload"}
            />
          </label>

          <input
            style={{
              border: "none",
              padding: "6px",
              background: "#FFF8DC",
              borderRadius: "6px",
            }}
            placeholder="New email"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            style={{
              border: "none",
              padding: "6px",
              background: "#FFF8DC",
              borderRadius: "6px",
            }}
            placeholder="New email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <input
            style={{
              border: "none",
              padding: "6px",
              background: "#FFF8DC",
              borderRadius: "6px",
            }}
            placeholder="New email"
            value={parseInt(newNumber)}
            onChange={(e) => setNewNumber(parseInt(e.target.value))}
          />
          <Button
            style={{
              background: "#D2B48C",
              borderRadius: "6px",
            }}
            onClick={handleAllUpdate}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};
