import React, { useState } from "react";
import {
  Button,
  Segment,
  Image,
  Grid,
  Message,
  Form,
  Icon,
} from "semantic-ui-react";
import RegisterForm from "./user/RegisterForm";

export default function LoginForm() {
  const [show, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }
  function hideModal() {
    setModal(false);
  }
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "90vh", marginTop: 2 }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment
            textAlign="center"
            style={{ border: "0px", boxShadow: "none", marginBottom: "0" }}
          >
            <Image src="/images/logo.jpg" centered />
          </Segment>
          <Form size="large">
            <Segment>
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
              <Icon name='sign-in' />
                Login
              </Button>
            </Segment>
          </Form>
            <Message>
              <p> New to us? <span onClick={showModal} style={{cursor:'pointer', color : 'red'}}> Sign Up</span></p>
          </Message>
          <RegisterForm show={show} handleClose={hideModal} />
        </Grid.Column>
      </Grid>
    </>
  );
}
