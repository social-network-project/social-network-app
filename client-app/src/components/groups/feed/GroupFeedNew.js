import PostForm from "../../post/PostForm";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Segment } from "semantic-ui-react";

export default function GroupFeedNew({selectedInterest, posts, setPosts, connectedUserId}) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const clearInputPost = () => {
    setTitle("");
    setCaption("");
  };

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

  useEffect(() => {
    loadPosts();
  }, []);

  const postToServer = () => {
    fetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        id: uuid(),
        idUser: connectedUserId,
        idGroup: selectedInterest.id,
        image: imgData,
        title: title,
        caption: caption,
        likes :0,
        comments:[],
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts([...posts,result]);
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
    <>
    {selectedInterest.users.find((x) => x === connectedUserId) && (
       
    <Segment>
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
    </Segment>)}
    </>
  );
}
