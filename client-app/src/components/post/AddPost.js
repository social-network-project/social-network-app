import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function AddPost() {
  const firstRender = useRef(true);

  const [subject, setSubject] = useState("");
  const [caption, setCaption] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const clearInputPost = () => {
    setSubject("");
    setCaption("");
  };

  const addPost = () => {
    setPosts([
      ...posts,
      {
        postSubject: subject,
        postCaption: caption,
        postImage: selectedImage,
        id: uuidv4(),
      },
    ]);
    clearInputPost();
  };

  const editPost = (post) => {
    setSubject(post.postSubject);
    setCaption(post.postCaption);
    setSelectedImage(post.postImage);
    setCurrentPostId(post.id);
    console.log(post);
  };

  const updatePost = () => {
    setPosts([
      ...posts.filter((x) => x.id !== currentPostId),
      {
        postSubject: subject,
        postCaption: caption,
        postImage: selectedImage,
        id: currentPostId,
      },
    ]);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    clearInputPost();
    setCurrentPostId(null);
    !currentPostId ? addPost() : updatePost(currentPostId);
  };

  const removePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem("Post", JSON.stringify([...posts]));
    }
  }, [posts]);

  useEffect(() => {
    if (localStorage.getItem("Post") !== null) {
      const newPosts = localStorage.getItem("Post");
      setPosts(JSON.parse([...posts, newPosts]));
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <label>Post subject</label>
        <input
          type="text"
          placeholder="Enter post subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label className="captionLabel">Image</label>
        <input
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <button>Upload</button>
        <label>Caption</label>
        <input
          type="text"
          placeholder="Enter caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">
          {currentPostId !== null ? "Update" : "Post"}
        </button>
      </form>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.postSubject}</h2>
          <img>{post.postImage}</img>
          <p>{post.postCaption}</p>
          <button onClick={() => removePost(post.id)}>Delete post</button>
          <button onClick={() => editPost(post)}>Edit post</button>
        </div>
      ))}
    </div>
  );
}

export default AddPost;
