import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Icon, Container } from "semantic-ui-react";

export default function GroupDashboard({ interests }) {
  return (
    <Container style={{ marginTop: "7em" }}>
      <Card.Group centered style={{ maxWidth: "1143px" }}>
        {interests.map((interest) => (
          <Card key={interest.id}>
            <Link to={`/feed/${interest.id}`}>
              <Image
                src={`/images/interests/${interest.image}`}
                wrapped
                ui={false}
              />
            </Link>
            <Card.Content>
              <Card.Header>{interest.title}</Card.Header>
              <Card.Description>{interest.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              {/* <a href="#"> */}
              <Icon name="user" />
              {interest.users.length} Members
              {/*   </a> */}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
