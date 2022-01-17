import { useParams, Link } from "react-router-dom";
import { Segment, Image, Item, Header, Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";

export default function GroupFeedHeader({ selectedInterest, users }) {
  const params = useParams();
  

  const activityImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/images/interests/wallpaper/${selectedInterest.image}`}
          fluid
          style={{ filter: "brightness(50%)", height: "350px" }}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={selectedInterest.title}
                  style={{ color: "white" }}
                />
                <p>Created : {selectedInterest.date}</p>
                <Icon name="user" />
                {selectedInterest.users.length} Members
              </Item.Content>
            </Item>
            <Item>
              <Image.Group size="mini">
                {users.map(
                  (user) =>
                    selectedInterest.users.find((x) => x === user.id) && (
                      <Link key={user.id} to={`/profile/${user.id}`}>
                        <Image src={user.userImage} avatar />
                      </Link>
                    )
                )}
              </Image.Group>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
     
    </Segment.Group>
  );
}
