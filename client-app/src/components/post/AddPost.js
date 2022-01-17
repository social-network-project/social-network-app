import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Container, Card, Image, Icon } from "semantic-ui-react";

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
    <Container>
      <Form onSubmit={handleSumbit}>
        <Form.Input
          width={4}
          label="Subject"
          type="text"
          placeholder="Enter post subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Form.Input
          width={4}
          label="Image"
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <Button>Upload</Button>
        <Form.TextArea
          rows={5}
          width={6}
          label="Caption"
          type="text"
          placeholder="Enter caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button positive type="submit">
          {currentPostId !== null ? "Update" : "Post"}
        </Button>
      </Form>
      {posts.map((post) => (
        <Card key={post.id}>
          <Card.Content>
            <Card.Header>{post.postSubject}</Card.Header>
            <Image>{post.postImage}</Image>
            <Card.Description>{post.postCaption}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
            </a>
          </Card.Content>
          <Button.Group>
            <Button negative onClick={() => removePost(post.id)}>
              Delete post
            </Button>
            <Button onClick={() => editPost(post)}>Edit post</Button>
          </Button.Group>
        </Card>
      ))}
    </Container>
  );
}

export default AddPost;
