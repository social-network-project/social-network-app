import { Link } from "react-router-dom";
import { Segment, Image, Item, Header, Icon, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";

export default function GroupFeedHeader({
  selectedInterest,
  setSelectedInterest,
  users,
  connectedUserId,
  interests,
  setInterests,
}) {
  const [joinEnabled, setJoinEnabled] = useState(true);

  const activityImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };

  function enableJoin() {
    console.log(connectedUserId)  
    if (selectedInterest.users.find((u) => u === connectedUserId)){
        setJoinEnabled(false);
        console.log("setEnableJoin to false");
    }
      
    else {
        setJoinEnabled(true);
        console.log("setEnableJoin to false");
    } 
  }
  useEffect(() => {
    console.log("called useEffect groupfeedHeader")  
    enableJoin();
    
  }, [selectedInterest]);

  function joinGroup() {
    selectedInterest.users = [...selectedInterest.users, connectedUserId];
    setSelectedInterest(selectedInterest);
    setInterests([
      ...interests.filter((x) => x.id !== selectedInterest.id),
      selectedInterest,
    ]);
    setJoinEnabled(false);
    submitChangesToAPI();
  }

  function leaveGroup() {
    selectedInterest.users = [
      ...selectedInterest.users.filter((x) => x !== connectedUserId),
    ];
    setSelectedInterest(selectedInterest);
    setInterests([
      ...interests.filter((x) => x.id !== selectedInterest.id),
      selectedInterest,
    ]);
    setJoinEnabled(true);
    submitChangesToAPI();
  }
  function submitChangesToAPI() {
    fetch(`/interests/${selectedInterest.id}`, {
      method: "PUT",
      body: JSON.stringify({
        users: selectedInterest.users,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("Interest not found", error);
      });
  }
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
                    <p> {selectedInterest.description}</p>
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
              <Item.Group style={{ width: "90%" }} attached="bottom">
                <Button
                  color="red"
                  floated="right"
                  onClick={joinGroup}
                  disabled={!joinEnabled}
                >
                  Join Interest
                </Button>
                <Button
                  floated="right"
                  onClick={leaveGroup}
                  disabled={joinEnabled}
                >
                  Leave Interest
                </Button>
              </Item.Group>
            </Segment>
          </Segment>
        </Segment.Group>
  );
}
