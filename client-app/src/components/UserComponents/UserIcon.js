import { Link } from "react-router-dom";
import { Image, Item } from "semantic-ui-react";

export default function UserIcon({ connectedUser }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      {connectedUser && (
        <Item>
          <Image
            size="tiny"
            as="a"
            target="_blank"
            className="circular"
            style={{ margin: "0 0.4rem 0 0.4rem" }}
            src={connectedUser.userImage}
          ></Image>
          <div>
            <p>
              Welcome,{" "}
              <strong>
                {capitalizeFirstLetter(connectedUser.displayName)}
              </strong>
            </p>
            <p>
              <Link to={`/profile/${connectedUser.id}`}>Go to Profile</Link>
            </p>
          </div>
        </Item>
      )}
    </>
  );
}
