import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { Container, Header, Icon, Input, Radio, Item } from "semantic-ui-react";

export default function Settings() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Container textAlign="center" style={{ marginTop: "5rem" }}>
      <Header as="h2" icon>
        <Icon name="settings" />
        Dashboard Settings
        <Header.Subheader>Manage your Dashboard settings</Header.Subheader>
      </Header>
    </Container>
  );
}
