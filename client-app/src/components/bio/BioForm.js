import { Form, Button, Container, Image } from "semantic-ui-react";

function BioForm({
  displayName,
  setDisplayName,
  aboutMe,
  setAboutMe,
  currentBioId,
  bioImage,
  removeSelectedImage,
  imageChange,
  handleSumbit,
}) {
  return (
    <Container>
      <Form onSubmit={handleSumbit}>
        <Form.Input
          width={4}
          label="Profile picture"
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
        {bioImage && (
          <div>
            <Image src={URL.createObjectURL(bioImage)} size="small" />
            <Button negative onClick={removeSelectedImage}>
              Remove image
            </Button>
          </div>
        )}
        <Form.Input
          width={4}
          label="Name"
          type="text"
          placeholder="My name is..."
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Form.TextArea
          width={4}
          rows={8}
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
