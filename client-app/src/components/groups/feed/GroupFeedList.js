import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Segment,
  Grid,
  Icon,
  Image,
  Form,
  Header,
  Comment,
  Button,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

export default function GroupFeedList({
  selectedInterest,
  connectedUser,
  users,
}) {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
     loadPosts();
  }, [selectedInterest]);
  function loadPosts() {
    fetch(`/posts/${selectedInterest.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.log("Error fetching posts", error));
  }
  function addComment(e, idPost) {
    e.preventDefault();
    let newComment = {
      id: uuid(),
      userId: connectedUser,
      comment: comment,
    };
    let currentPost = posts.find((x) => x.id === idPost);
    currentPost.comments.push(newComment);
    let objIndex = posts.findIndex((a) => a.id === idPost);
    posts[objIndex] = currentPost;

    updateAPI(idPost, currentPost.comments);
    setPosts(posts);
    setComment("");
  }

  function updateAPI(id, comments) {
    fetch(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        comments: comments,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("Post not found", error);
      });
  }
  return (
    <>
      {selectedInterest && selectedInterest.users.find((x) => x === connectedUser) && (
        <>
          <Segment
            textAlign="center"
            attached="top"
            inverted
            color="black"
            style={{ border: "none" }}
          >
            <Header>
              {posts.length > 0
                ? "Posts recently published"
                : "No posts recently published"}
            </Header>
          </Segment>
          <Segment attached>
            <Comment.Group>
              {posts &&
                posts.map((post) => (
                  <Segment key={post.id}>
                    <Header>
                      {post.title} by{" "}
                      <strong>
                        {users.find((x) => x.id === post.idUser)
                          ? users.find((x) => x.id === post.idUser).displayName
                          : "Unknown"}
                      </strong>
                    </Header>
                    <p>{post.caption}</p>
                    <Image src={post.image} size="medium" centered rounded />
                    <Button
                      //onClick={setLikes(post.likes +1)}
                      floated="right"
                      color="red"
                      content="Like"
                      icon="heart"
                      label={{
                        basic: true,
                        color: "red",
                        pointing: "left",
                        content: post.likes,
                      }}
                    />
                    {post.comments.map((cmt) => (
                      <Comment key={cmt.id}>
                        {users.map(
                          (user) =>
                            user.id === cmt.userId && (
                              <div key={user.id}>
                                <Comment.Avatar src={user.userImage} />
                                <Comment.Content>
                                  <Comment.Author
                                    as={NavLink}
                                    to={`/profile/${user.id}`}
                                    style={{ marginLeft: "1em" }}
                                  >
                                    {user.displayName}
                                  </Comment.Author>
                                </Comment.Content>
                              </div>
                            )
                        )}
                        <Comment.Text style={{ marginLeft: "3.5em" }}>
                          {cmt.comment}
                        </Comment.Text>
                      </Comment>
                    ))}
                    <Form reply>
                      <Form.TextArea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                      <Button
                        onClick={(e) => addComment(e, post.id)}
                        content="Add Comment"
                        labelPosition="left"
                        icon="edit"
                        primary
                      />
                    </Form>
                  </Segment>
                ))}
            </Comment.Group>
          </Segment>
        </>
      )}
    </>
  );
}
