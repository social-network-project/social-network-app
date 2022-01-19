import { Link } from "react-router-dom";
import { Image, Item } from "semantic-ui-react";

export default function UserIcon({ connectedUser }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      {connectedUser && (
        <Item className="usericon">
          <Image
            size="tiny"
            as="a"
            target="_blank"
            className="circular"
            src={connectedUser.userImage}
          ></Image>
          <div className="usericon__txt">
            <p>
              Welcome,{" "}
              <strong>
                {capitalizeFirstLetter(connectedUser.displayName)}
              </strong>
            </p>

            <Link to={`/profile/${connectedUser.id}`}>
              <Item as="a" className="links">
                Go to Profile
              </Item>
            </Link>
          </div>
        </Item>
      )}
    </>
  );
}
