import { Container, Card, Image, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupFeedHeader from "./GroupFeedHeader";
import GroupFeedNew from "./GroupFeedNew";
import GroupFeedList from "./GroupFeedList";

export default function GroupFeed({ interests, users }) {
  const params = useParams();
  const [selectedInterest, setSelectedInterest] = useState(getInterestById(params.idGroup));

  useEffect(() => {
    
    console.log("group id= " + params.idGroup);
    console.log("interest id= " + selectedInterest.title);
  }, [selectedInterest]);
  function getInterestById(id) {
    if (interests) return interests.find((x) => x.id === id);
    return null;
  }
 
  return (
    <Container>
      <GroupFeedHeader selectedInterest={selectedInterest} users={users}/>
      <GroupFeedNew />
     <GroupFeedList selectedInterest={selectedInterest} users={users} />
    </Container>
  );
}
