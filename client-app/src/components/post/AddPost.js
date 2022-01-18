import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Card, Image, Icon } from "semantic-ui-react";
import PostForm from "./PostForm";

const AddPost = () => {
  const firstRender = useRef(true);

  const [subject, setSubject] = useState("");
  const [caption, setCaption] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const clearInputPost = () => {
    setSubject("");
    setCaption("");
  };

  const imageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[1]);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
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
    setIsEditOpen(true);
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

  const cancelEdit = () => {
    clearInputPost();
    setCurrentPostId(null);
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

  const postToServer = () => {
    fetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        id: uuid(),
        idUser: 
        subject: subject,
        caption: caption,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts([...posts, result]);
      })
      .catch((error) => {
        console.log("Error adding post.", error);
      });
  };

  return (
    <Container>
      <PostForm
        subject={subject}
        setSubject={setSubject}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        caption={caption}
        setCaption={setCaption}
        handleSumbit={handleSumbit}
        imageChange={imageChange}
        removeSelectedImage={removeSelectedImage}
        cancelEdit={cancelEdit}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />
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
};

export default AddPost;
