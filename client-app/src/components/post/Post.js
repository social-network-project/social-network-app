import { useState } from "react";
import PostForm from "./components/PostForm";

function Post() {
  const [subject, setSubject] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([
    {
      postSubject: "Subject",
      postCaption: "Caption",
    },
  ]);

  const addPost = () => {
    setPosts([
      ...posts,
      {
        postSubject: subject,
        postCaption: caption,
      },
    ]);
  };

  const handleSubmitPost = (e) => {
    addPost();
  };

  return (
    <div>
      <PostForm
        subject={subject}
        setSubject={setSubject}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        caption={caption}
        setCaption={setCaption}
        handleSubmitPost={handleSubmitPost}
      />
    </div>
  );
}

export default Post;
