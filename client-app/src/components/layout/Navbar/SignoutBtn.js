import { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SignoutBtn(props) {
  const [signout, setSignout] = useState(false);

  const handleSignout = (e) => {
    e.preventDefault();
    setSignout(!signout);
  };
  return <>{/* <Button></Button> */}</>;
}
