import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
("");

function Post() {
  const firstRender = useRef(true);

  const [subject, setSubject] = useState("");
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);

  const addPost = (e) => {
    e.preventDefault();
    setPosts([
      ...posts,
      {
        postSubject: subject,
        postCaption: caption,
        id: uuidv4(),
      },
    ]);
    setSubject("");
    setCaption("");
  };

  const removePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    if (firstRender.current) {
      console.log("true");
      firstRender.current = false;
    } else {
      localStorage.setItem("Post", JSON.stringify([...posts]));
      console.log("not first page load");
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
      <form onSubmit={addPost}>
        <label>Post subject</label>
        <input
          type="text"
          placeholder="Enter post subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label>Caption</label>
        <input
          type="text"
          placeholder="Enter caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.postSubject}</h2>
          <p>{post.postCaption}</p>
          <button onClick={() => removePost(post.id)}>Delete post</button>
        </div>
      ))}
    </div>
  );
}

export default Post;
