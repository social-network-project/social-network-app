import { useParams, Link } from "react-router-dom";
import { Image, Item } from "semantic-ui-react";

export default function UserIcon() {
  const params = useParams();
  return (
    <>
      <Item>
        <Image
          size="tiny"
          as="a"
          target="_blank"
          className="circular"
          style={{ margin: "0 0.4rem 0 0.4rem" }}
          src="https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        ></Image>
        <div>
          <p>Welcome, {params.idUser}</p>
          <p>
            <Link to="/profile/:id">Go to Profile</Link>
          </p>
        </div>
      </Item>
    </>
  );
}
