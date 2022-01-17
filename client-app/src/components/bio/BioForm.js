import { Form, Button, Container } from "semantic-ui-react";

function BioForm({
  name,
  setName,
  aboutMe,
  setAboutMe,
  currentBioId,
  handleSumbit,
}) {
  return (
    <Container>
      <Form onSubmit={handleSumbit}>
        <Form.Input
          required
          label="Name"
          type="text"
          placeholder="My name is..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.TextArea
          required
          rows={6}
          label="About me"
          type="text"
          placeholder="About me..."
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />
        <Button positive type="submit">
          {currentBioId !== null ? "Update" : "Save"}
        </Button>
      </Form>
    </Container>
  );
}

export default BioForm;
