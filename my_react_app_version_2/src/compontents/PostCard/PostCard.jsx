import React, { useEffect, useState } from "react";
import { Card, Flex, Button, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import card_img from "../../assets/images//card_imagees/ui.jpg";
import { FaClock } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
const { Title, Text, Paragraph } = Typography;

export const PostCard = ({ postData }) => {
  const [isReadMoreText, setIsReadMoreText] = useState(false);
  useEffect(() => {
    if (postData && postData?.body && postData.body.length > 100) {
      setIsReadMoreText(true);
    }
  }, [postData]);
  return (
    <>
      {postData?.lecture?.name && (
        <Card
          hoverable
          style={{ borderRadius: "24px" }}
          styles={{ body: { padding: 0, overflow: "hidden" } }}
        >
          <Flex
            justify="space-between"
            style={{ padding: "0px 20px" }}
            gap={"25px"}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                alt="avatar"
                src={card_img}
                style={{
                  width: "180px",
                  height: "100%",
                  objectFit: "fill",
                }}
              />
            </div>
            <div style={{ width: "60%", padding: "12px 5px" }}>
              {/* <Title level={3}>{postData.name.slice(0, 20)}</Title> */}
              <Title level={5}>
                <Flex align="center" gap={12}>
                  <FaClock /> {postData.time}
                </Flex>
              </Title>
              <Title level={5}>{postData.lecture?.name}</Title>
              <Paragraph level={5}>
                Преподаватель: {postData.lecture?.teacher}
              </Paragraph>
              <Paragraph level={5}>
                Аудитория / Pruffme:{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: postData.lecture?.classroom,
                  }}
                />
              </Paragraph>
            </div>
            <Flex align="end" style={{ padding: "20px" }}>
              <div
                style={{
                  background: "var(--primary-color)",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link style={{ color: "#fff" }}>
                  <FaChevronRight size={20} />
                </Link>
              </div>
            </Flex>
          </Flex>
        </Card>
      )}
    </>
  );
};
