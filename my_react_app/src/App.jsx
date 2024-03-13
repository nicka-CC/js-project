import logo from "./logo.svg";
import "./App.css";
import { PageLayout } from "./compontents/Layout/Layout";
import { useEffect, useState } from "react";
import { Routes, Route, useParams, useLocation, Link } from "react-router-dom";
import AddNewPost from "./compontents/AddNewPost";
import styles from "./css/styles.module.css";
// import { style } from "./scss/styles.css";

// import { useSelector } from 'react-redux'

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  const getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  };
  const getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => setUsers(res));
  };
  console.log(users);
  const handleAddPost = (text) => {
    const newPost = {
      userId: 0,
      title: "Пост для Задачи со звёздочкой",
      body: text,
    };

    setPosts([newPost, ...posts]);
  };

  const user = {
    name: "Ivan",
    age: "28",
    role: "admin",
  };
  const isAdmin = (element) => (user.role == "admin" ? element : <PageError />);
  const isAuth = (element) => (user.role == "admin" ? element : <PageError />);
  return (
    <Routes>
      <Route path="/" element={isAdmin(<PageLayout></PageLayout>)}>
        <Route
          index
          element={
            <>
              <AddNewPost onAddPost={handleAddPost} />
              <HomeCompnonent posts={posts} users={users} />
            </>
          }
        />

        <Route
          path="/post/:postId"
          element={<PostDetailPage users={users} />}
        />
        <Route path="info" element={<InfoPage />} />
        <Route path="user" element={<>user</>} />
        <Route path="*" />
      </Route>

      <Route path="/auth/">
        <Route index element={<HomeCompnonent posts={posts} users={users} />} />
        <Route path="login" element={<InfoPage />} />
        <Route path="resetpassword" element={<>user</>} />
      </Route>

      <Route path="/error/" element={<PageLayout />}>
        <Route index element={<>У вас нет роли администратора</>} />
      </Route>
    </Routes>
  );
}

export default App;

const HomeCompnonent = ({ posts, users }) => {
  const params = useParams();
  const location = useLocation();
  console.log("🚀 ~ HomeCompnonent ~ location:", location);

  console.log("🚀 ~ HomeCompnonent ~ params:", params);
  return (
    <div className={styles.black}>
      {posts.map((post, index) => (
        <Link to={`/post/${post.id}`}>
          <PostComponent key={index} postData={post} users={users} />
        </Link>
      ))}
    </div>
  );
};

const PostComponent = ({ postData, users }) => {
  const author = users.find((user) => user.id === postData.userId);

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className={styles.post_author}>
          {author ? author.name : "Бердашев Никита Алексеевич"}
        </div>
        <div className={styles.post_title}> {postData.title}</div>
      </div>

      <div>Body: {postData.body}</div>
    </div>
  );
};
const PostDetailPage = ({ users }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [postId]);

  const author = users.find((user) => user.id === post.userId);

  return (
    <div className={styles.post2}>
      <h2>Post Detail</h2>
      <div className={styles.post_title}>{post.title}</div>
      <div>Body: {post.body}</div>
      <div className={styles.post_author}>
        {author ? author.name : "Бердашев Никита Алексеевич"}
      </div>

      <h3>Comments</h3>
      {comments.map((comment) => (
        <div className={styles.comments} key={comment.id}>
          <div className={styles.comment_title}>Name: {comment.name}</div>
          <div className={styles.comment_email}>Email: {comment.email}</div>
          <div>Comment: {comment.body}</div>
        </div>
      ))}
    </div>
  );
};

const InfoPage = () => {
  const location = useLocation();

  // const { tel } = location.state
  // console.log("🚀 ~ InpoPage ~ location:", location)
  return <div className="bg-black font-bold">info</div>;
};

const PageError = () => {
  return <>У вас нет роли администратора</>;
};
