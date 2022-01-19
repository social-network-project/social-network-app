import { Header, Image } from "semantic-ui-react";
export default function NavBar() {
  return (
    <>
      <Header as="h2" />
      <Image
        src="/images/transparent-logo.png"
        style={{ width: "80px", padding: "10px" }}
      />
    </>
  );
}
