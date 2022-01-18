import { useEffect } from "react";
import { Container, Header, Icon, Input, Radio, Item } from "semantic-ui-react";

export default function Settings() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Container textAlign="center" style={{ marginTop: "5rem" }}>
      <Header as="h2" icon>
        <Icon name="settings" />
        Account settings
        <Header.Subheader>Manage your account settings</Header.Subheader>
      </Header>
      <Item>
        <Input list="languages" placeholder="Choose language" />
        <datalist id="languages">
          <option value="English" />
          <option value="简化字/Simplified Chinese " />
          <option value="Français" />
        </datalist>
      </Item>
      <Item>
        <label>Choice</label>
        <Radio toggle />
      </Item>
    </Container>
  );
}
