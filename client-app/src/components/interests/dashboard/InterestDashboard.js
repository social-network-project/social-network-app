import React, { useState, useEffect } from "react";
import { useLocation, useParams  } from "react-router-dom";
import { Card, Image, Icon, Container } from "semantic-ui-react";

export default function InterestDashboard() {
  const [interests, setInterests] = useState([]);
  const connectedUser = useLocation();
  const params = useParams();

  useEffect(() => {
    loadInterests();
    console.log(interests);
    console.log('welcome' + connectedUser);
  }, []);
  function loadInterests() {
    fetch("/interests")
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
      })
      .catch((error) => console.log("Error fetching interests", error));
  }
  return (
    <Container style={{ marginTop: "7em" }}>
      <Card.Group centered style={{ maxWidth: "1143px" }}>
        {interests.map((interest) => (
          <Card key={interest.id}>
            <a href="#">
              <Image src={interest.image} wrapped ui={false} />
            </a>
            <Card.Content>
              <Card.Header>{interest.title}</Card.Header>
              <Card.Description>{interest.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a href="#">
                <Icon name="user" />
                {interest.users.length} Members
              </a>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
