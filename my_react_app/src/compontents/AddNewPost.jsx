import { useState } from "react";
import styles from "./../css/styles.module.css";

export default function AddNewPost({ onAddPost }) {
  const [newPostText, setNewPostText] = useState("");

  const handleInputChange = (event) => {
    setNewPostText(event.target.value);
  };

  const handleAddPost = () => {
    if (newPostText.trim() !== "") {
      onAddPost(newPostText);
      setNewPostText("");
    }
  };

  return (
    <div className={styles.add}>
      <input
        type="text"
        value={newPostText}
        onChange={handleInputChange}
        placeholder="Введите текст поста"
        className={styles.add_input}
      />
      <button onClick={handleAddPost} className={styles.add_button}>
        Опубликовать
      </button>
    </div>
  );
}
