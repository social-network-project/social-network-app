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

  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [bio, setBio] = useState([
    {
      bioName: "Name",
      bioInfo: "Info",
    },
  ]);

  const handleSubmitBio = (e) => {
    console.log("Bio submit");
  };

  return (
    <div className="App">
      <div className="form-box">
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
      <div className="form-box">
        <BioForm
          name={name}
          setName={setName}
          info={info}
          setInfo={setInfo}
          handleSubmitBio={handleSubmitBio}
        />
      </div>
    </div>
  );
}

export default Post;
