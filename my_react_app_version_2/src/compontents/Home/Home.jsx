import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PostCard } from "../PostCard/PostCard";
import { useLazyGetAllPostsQuery } from "../../services/postService/postService";
import { Typography, Result } from "antd";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import Title from "antd/es/typography/Title";

export const Home = () => {
  const params = useParams();
  const location = useLocation();

  const [getPosts, { data: posts, isError, isSuccess, isLoading, error }] =
    useLazyGetAllPostsQuery();
  // console.log("🚀 ~ Home ~ posts:", posts.result)

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log("🚀 ~ HomeCompnonent ~ location:", location);

  console.log("🚀 ~ HomeCompnonent ~ params:", params);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px 50px",
        // width: '64em',
        // margin: '0 auto',
        // marginTop: '20px'
      }}
    >
      <div
        style={{
          padding: "24px 50px",
          position: "sticky",
          top: "0px",
          background: "#fff",
          height: "250px",
          zIndex: 1,
        }}
      >
        <Title level={1}>Расписание занятий</Title>
      </div>
      {isSuccess &&
        posts?.ok &&
        posts.result.map((post, index) => (
          <>
            {Object.keys(post).map((weekNumber) => {
              return (
                <>
                  <Title level={2}>Неделя - {weekNumber}</Title>

                  {Object.keys(post[weekNumber]).map((day) => {
                    let currentWeekData = post[weekNumber];

                    return (
                      <>
                        <Title level={5}>{day}</Title>

                        {currentWeekData[day].length > 0 ? (
                          currentWeekData[day].map((currentDayPost) => (
                            <PostCard postData={currentDayPost} />
                          ))
                        ) : (
                          <Result
                            icon={<FaRegFaceSmileWink size={42} />}
                            subTitle="В данное время пар нету!"
                          />
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}
          </>
        ))}
    </div>
  );
};
