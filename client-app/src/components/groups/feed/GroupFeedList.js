import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Segment,
  Image,
  Form,
  Header,
  Comment,
  Button,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

export default function GroupFeedList({
  selectedInterest,
  connectedUserId,
  users,
  posts,
  setPosts,
}) {
  const [comment, setComment] = useState({});
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
      userId: connectedUserId,
      comment: comment[idPost],
    };
    let currentPost = posts.find((x) => x.id === idPost);
    currentPost.comments.push(newComment);
    let objIndex = posts.findIndex((a) => a.id === idPost);
    posts[objIndex] = currentPost;

    updateAPI(idPost, currentPost.comments);
    setPosts(posts);
    setComment({ ...comment, [idPost]: "" });
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
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function onChange(e){
    const name = e.target.name;
    let value = e.target.value;
    setComment({ ...comment, [name]: value });
  }
  return (
    <>
      {selectedInterest &&
        selectedInterest.users.find((x) => x === connectedUserId) && (
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
            <Segment
              attached
              centered="true"
              style={{ boxShadow: "none", border: "none" }}
            >
              {posts &&
                posts.map((post) => (
                  <Segment key={post.id} style={{ width: "60%" }}>
                    <Header>
                      {capitalizeFirstLetter(post.title)} by{" "}
                      <strong>
                        {users.find((x) => x.id === post.idUser)
                          ? capitalizeFirstLetter(
                              users.find((x) => x.id === post.idUser)
                                .displayName
                            )
                          : "Unknown"}
                      </strong>
                    </Header>
                    <p>{post.caption}</p>
                    <Image src={post.image} size="medium" centered rounded />
                    <Button
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
                    <Comment.Group>
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
                                      {capitalizeFirstLetter(user.displayName)}
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
                    </Comment.Group>
                    <Form reply>
                      <Form.TextArea
                        name={post.id}
                        onChange={(e) => onChange(e)}
                        value={comment[post.id]}
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
            </Segment>
          </>
        )}
    </>
  );
}
