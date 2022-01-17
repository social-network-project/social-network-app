import { Container, Card, Image, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupFeedHeader from "./GroupFeedHeader";
import GroupFeedNew from "./GroupFeedNew";
import GroupFeedList from "./GroupFeedList";

export default function GroupFeed({ interests, setInterests, users, connectedUser }) {
  const params = useParams();
  const [selectedInterest, setSelectedInterest] = useState(getInterestById(params.idGroup));

  useEffect(() => {
    fetch(`/interests/${selectedInterest.id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedInterest(data);
      })
      .catch((error) => console.log("Error fetching interests", error));
  }, []);

  function getInterestById(id) {
    if (interests) return interests.find((x) => x.id === id);
    return null;
  }

  return (
    <Container>
      <GroupFeedHeader
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        users={users}
        connectedUser={connectedUser}
        interests={interests}
        setInterests={setInterests}
      />
      <GroupFeedNew />
      <GroupFeedList selectedInterest={selectedInterest} connectedUser={connectedUser} users={users} />
    </Container>
  );
}
