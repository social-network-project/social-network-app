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

export default function GroupFeedList({
  selectedInterest,
  connectedUser,
  users,
}) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    loadPosts();
  }, []);
  function loadPosts() {
    fetch(`/posts/${selectedInterest.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.log("Error fetching posts", error));
  }

  return (
    <>
      {selectedInterest.users.find((x) => x === connectedUser) && (
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
                    {post.comments.map((comments) => (
                      <Comment key={comments.id}>
                        {users.map(
                          (user) =>
                            user.id === comments.userId && (
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
                          {comments.comment}
                        </Comment.Text>
                      </Comment>
                    ))}
                    <Form reply>
                      <Form.TextArea />
                      <Button
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
