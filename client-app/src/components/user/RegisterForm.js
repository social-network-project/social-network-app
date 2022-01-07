import React from "react";
import { Button, Form, Segment, Header,Icon } from "semantic-ui-react";

export default function RegisterForm({ handleClose, show }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Form size="large">
          <Segment>
            <Header as="h2" color="red" textAlign="center">
              Sign up to Interests
            </Header>
            <Form.Input
              fluid
              icon="users"
              iconPosition="left"
              name="username" 
              placeholder="Username"
            />
            <Form.Input
              fluid
              icon="users"
              iconPosition="left"
              name="displayName"
              placeholder="Display name"
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            <Button color="red" style={{ width: "120px" }}>
            <Icon name='signup' />
              Register
            </Button>
            <Button onClick={handleClose} style={{ width: "120px" }}>
            <Icon name='close' />
              Close
            </Button>
          </Segment>
        </Form>
      </section>
    </div>
  );
}
