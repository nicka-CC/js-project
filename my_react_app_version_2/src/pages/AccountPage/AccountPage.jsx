import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export const AccountPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Account Page</h1>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <p>{user.number}</p>
      <Avatar
        size={42}
        src={`http://localhost:3555/uploads/${user.avatar}`}
      ></Avatar>
    </div>
  );
};
