import { useEffect } from "react";
import { Container } from "semantic-ui-react";
export default function NotFound() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Container textAlign="center" style={{ marginTop: "5rem" }}>
      <h1 style={{ fontSize: "58px" }}>404 - Page Not Found</h1>
    </Container>
  );
}
