import React, { useState } from "react";
import {
  Button,
  Form,
  Segment,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

export default function RegisterForm({ handleClose, show, users, setUsers }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [usernameError, setUsernameError] = useState({ err: false, msg: "" });
  const [emailError, setEmailError] = useState({ err: false, msg: "" });
  const [passwordError, setPasswordError] = useState({ err: false, msg: "" });
  const [passwordConfirmMatchError, setPasswordConfirmMatchError] = useState({
    err: false,
    msg: "",
  });
  const [createUserError, setCreateUserError] = useState(false);
  const [createUserSuccess, setCreateUserSuccess] = useState(false);

  function addUser() {
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        id: uuid(),
        username: username,
        displayName: displayName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const userAdded = result;
        users ? setUsers([...users, userAdded]) : setUsers([userAdded]);
        console.log(result);
        setCreateUserSuccess(true);
      })
      .catch((error) => {
        setCreateUserSuccess(false);
        console.log("Error adding new user.", error);
      });
  }
  function handleSubmit() {
    let err = false;
    // check if username is not empty, contains at least 5 letters
    if (username.trim() !== "") {
      if (username.length <= 4) {
        setUsernameError({
          err: true,
          msg: "Username must at least contain 5 letters.",
        });
        err = true;
        return err;
      } else {
        setUsernameError({ err: false, msg: "" });
      }
      if (!new RegExp(/^[a-zA-Z]+$/).test(username)) {
        setUsernameError({
          err: true,
          msg: "Username must only contain letters.",
        });
        err = true;
        return err;
      } else {
        setUsernameError({ err: false, msg: "" });
      }
    }
    // check if email is not empty and is valid
    if (email.trim() !== "") {
      if (
        !new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(email)
      ) {
        setEmailError({ err: true, msg: "Enter a valid email address." });
        err = true;
        return err;
      } else {
        setEmailError({ err: false, msg: "" });
      }
    }
    // check if password is not empty and contains 8 characters : numbers, uppercase, lowercase and letters
    if (password.trim() !== "") {
      if (
        !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(
          password
        )
      ) {
        setPasswordError({
          err: true,
          msg: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.",
        });
        err = true;
        return err;
      } else {
        setPasswordError({ err: false, msg: "" });
      }
    }
    if (passwordConfirm.trim() !== "") {
      if (passwordConfirm !== password) {
        setPasswordConfirmMatchError({
          err: true,
          msg: "Password and Password confirmation must match.",
        });
        err = true;
        return err;
      } else {
        setPasswordConfirmMatchError({ err: false, msg: "" });
      }
    }

    if (!err) {
      if (users.find((x) => x.email === email)) {
        setCreateUserError(true);
      } else {
        setCreateUserError(false);
        addUser();
      }
    }
    return err;
  }
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Form size="large">
          <Segment>
            <Header as="h2" color="red" textAlign="center">
              Sign up to Interests
            </Header>
            {createUserError && (
              <Message negative>
                <Message.Header>Account already exists</Message.Header>
                <p>
                  An account already exists for this email address, please log
                  in or confirm your email address is correct
                </p>
              </Message>
            )}
             {createUserSuccess && !createUserError && (
              <Message positive>
                <Message.Header>Success</Message.Header>
                <p>
                  Congratulation, your account has been successfully created.
                </p>
              </Message>
            )}
            <Form.Input
              fluid
              icon="users"
              iconPosition="left"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder="Username"
              required
            />
            {usernameError.err && (
              <Message negative>
                <span>{usernameError.msg}</span>
              </Message>
            )}
            <Form.Input
              fluid
              icon="users"
              iconPosition="left"
              value={displayName}
              name="displayName"
              onChange={(e) => setDisplayName(e.currentTarget.value)}
              placeholder="Display name"
              required
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="E-mail address"
              required
            />
            {emailError.err && (
              <Message negative>
                <span>{emailError.msg}</span>
              </Message>
            )}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              type="password"
              required
            />
            {passwordError.err && (
              <Message negative>
                <span>{passwordError.msg}</span>
              </Message>
            )}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
              placeholder="Confirm Password"
              type="password"
              required
            />
            {passwordConfirmMatchError.err && (
              <Message negative>
                <span>
                  {passwordConfirmMatchError.msg}
                </span>
              </Message>
            )}
            <Button
              onClick={handleSubmit}
              type="submit"
              color="red"
              style={{ width: "120px" }}
            >
              <Icon name="signup" />
              Register
            </Button>
            <Button onClick={handleClose} style={{ width: "120px" }}>
              <Icon name="close" />
              Close
            </Button>
          </Segment>
        </Form>
      </section>
    </div>
  );
}
