import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Card, Image, Icon } from "semantic-ui-react";
import PostForm from "./PostForm";

const AddPost = () => {
  const firstRender = useRef(true);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const clearInputPost = () => {
    setTitle("");
    setCaption("");
  };

  // const imageChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const imageChange = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setSelectedImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const editPost = (post) => {
    setIsEditOpen(true);
    setTitle(post.title);
    setCaption(post.caption);
    setCurrentPostId(post.id);
    console.log(post);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    clearInputPost();
    setSelectedImage(null);
    setCurrentPostId(null);
    !currentPostId ? postToServer() : updatePost(currentPostId);
  };

  const cancelEdit = () => {
    clearInputPost();
    setCurrentPostId(null);
  };

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //   } else {
  //     localStorage.setItem("Post", JSON.stringify([...posts]));
  //   }
  // }, [posts]);

  useEffect(() => {
    loadPosts();
  }, []);

  const postToServer = () => {
    fetch("posts", {
      method: "POST",
      body: JSON.stringify({
        id: uuidv4(),
        idUser: "user1",
        idGroup: "group1",
        image: imgData,
        title: title,
        caption: caption,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts([
          ...posts,
          {
            title: result.title,
            caption: result.caption,
            image: result.imgData,
            id: result.id,
          },
        ]);
      })
      .catch((error) => {
        console.log("Error adding post.", error);
      });
  };

  const loadPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.log("Error fetching posts", error));
  };

  const updatePost = () => {
    fetch(`/posts/${currentPostId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        caption: caption,
        image: imgData,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPosts([...posts.filter((x) => x.id !== currentPostId), result]);
      })
      .catch((error) => {
        console.log("Post not found", error);
      });
  };

  const removePost = (id) => {
    fetch(`/posts/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
      })
      .catch((error) => {
        console.log("Post not found", error);
      });
  };

  return (
    <Container>
      <PostForm
        title={title}
        setTitle={setTitle}
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
            <Card.Header>{post.title}</Card.Header>
            <Image src={imgData}></Image>
            <Card.Description>{post.caption}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {/* <a> */}
            <Icon name="user" />
            {/* </a> */}
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
