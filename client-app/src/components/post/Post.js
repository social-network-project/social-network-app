import { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Input,
  Label,
  TextArea,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
("");

function Post() {
  const firstRender = useRef(true);

  const [subject, setSubject] = useState("");
  const [caption, setCaption] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);
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
        id: uuidv4(),
      },
    ]);
    clearInputPost();
  };

  const editPost = (post) => {
    setSubject(post.postSubject);
    setCaption(post.postCaption);
    setCurrentPostId(post.postId);
  };

  const updatePost = () => {
    setPosts(
      posts.map((post) =>
        post.postId === currentPostId
          ? { ...posts, postSubject: subject, postCaption: caption }
          : post,
      ),
    );
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    clearInputPost();
    setCurrentPostId(null);
    !currentPostId ? addPost() : updatePost();
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
      <Form onSubmit={handleSumbit}>
        <label>Post subject</label>
        <Input
          type="text"
          placeholder="Enter post subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Label>Caption</Label>
        <Input
          type="text"
          placeholder="Enter caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button type="submit">
          {currentPostId !== null ? "Update" : "Post"}
        </Button>
      </Form>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.postSubject}</h2>
          <p>{post.postCaption}</p>
          <Button secondary onClick={() => removePost(post.id)}>
            Delete post
          </Button>
          <Button onClick={() => editPost(post)}>Edit post</Button>
        </div>
      ))}
    </div>
  );
}

export default Post;
