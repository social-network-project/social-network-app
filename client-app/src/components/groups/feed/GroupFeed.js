import { Container, Card, Image, Icon } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupFeedHeader from "./GroupFeedHeader";
import GroupFeedNew from "./GroupFeedNew";
import GroupFeedList from "./GroupFeedList";

export default function GroupFeed({
  interests,
  setInterests,
  users,
  connectedUserId,
}) {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState({});

  useEffect(() => {
    if (Object.keys(selectedInterest).length === 0) {
      fetch(`/interests/${params.idGroup}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedInterest(data);
        })
        .catch((error) => console.log("Error fetching interests", error));
    }
  }, []);

/*   function getInterestById(id) {
    console.log("called getInterestById")  
    if (interests) return interests.find((x) => x.id === id);
    return null;
  }
 */
  return (
    <>
      { Object.keys(selectedInterest).length > 0 && (
        <Container>
          <GroupFeedHeader
            selectedInterest={selectedInterest}
            setSelectedInterest={setSelectedInterest}
            users={users}
            connectedUserId={connectedUserId}
            interests={interests}
            setInterests={setInterests}
          />
          <GroupFeedNew selectedInterest={selectedInterest} posts = {posts} setPosts = {setPosts} connectedUserId={connectedUserId} />
          <GroupFeedList
            selectedInterest={selectedInterest}
            connectedUserId={connectedUserId}
            users={users}
            posts = {posts}
            setPosts = {setPosts}
          />
        </Container>
      )}
    </>
  );
}
