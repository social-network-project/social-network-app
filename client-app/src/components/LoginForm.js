import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router";

export default function LoginForm({users, setUsers}) {
  const [show, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [wrongUserAdress, setWrongUserAdress] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const navigate = useNavigate();


  function getConnectedUser() {
    setWrongUserAdress(false);
    setWrongPassword(false);
    if (email !== "" && password !== "") {
      let emailExist = users.filter((x) => x.email === email);
      if (emailExist.length > 0) {
        setWrongUserAdress(false);
        let userPasswordCorrect = emailExist.filter(
          (x) => x.password === password
        );
        // if user email and password exist
        if (userPasswordCorrect.length > 0) {
          setWrongPassword(false);
          navigate(`/groups/${userPasswordCorrect[0].id}`);
        } else {
          setWrongPassword(true);
        }
      } else {
        setWrongUserAdress(true);
      }
    }
  }

  function clearInput() {
    setEmail("");
    setPassword("");
    setWrongUserAdress(false);
    setWrongPassword(false);
  }

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
                value={email}
                placeholder="E-mail address"
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              {wrongUserAdress && (
                <Message negative>
                  <span>
                    Invalide e-mail address. Please try again or Sign up.
                  </span>
                </Message>
              )}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                value={password}
                placeholder="Password"
                type="password"
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              {wrongPassword && (
                <Message negative>
                  <span>Wrong password. Please try again.</span>
                </Message>
              )}
              <Button
                onClick={getConnectedUser}
                color="red"
                style={{ width: "120px" }}
              >
                <Icon name="sign-in" />
                Login
              </Button>
              <Button onClick={clearInput} style={{ width: "120px" }}>
                <Icon name="undo" />
                Reset
              </Button>
            </Segment>
          </Form>
          <Message>
            <p>
              New to us?
              <span
                onClick={showModal}
                style={{ cursor: "pointer", color: "red" }}
              >
                {" "}
                Sign Up
              </span>
            </p>
          </Message>
          <RegisterForm
            show={show}
            handleClose={hideModal}
            users={users}
            setUsers={setUsers}
          />
        </Grid.Column>
      </Grid>
    </>
  );
}
