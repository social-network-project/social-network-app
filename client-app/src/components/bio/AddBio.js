import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Container, Card, Image, Icon } from "semantic-ui-react";

function AddBio() {
  const firstRender = useRef(true);

  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [currentBioId, setCurrentBioId] = useState("");
  const [bioInfo, setBioInfo] = useState([]);

  const clearInputBio = () => {
    setName("");
    setAboutMe("");
  };

  const addBio = () => {
    setBioInfo([
      ...bioInfo,
      {
        bioName: name,
        bioAboutMe: aboutMe,
        id: uuidv4(),
      },
    ]);
    clearInputBio();
  };

  const editBio = (bio) => {
    setName(bio.bioName);
    setAboutMe(bio.bioAboutMe);
    setCurrentBioId(bio.id);
  };

  const updateBio = () => {
    setBioInfo([
      bioInfo.filter((ed) => ed.id !== currentBioId),
      {
        bioName: name,
        bioAboutMe: aboutMe,
        id: currentBioId,
      },
    ]);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    setCurrentBioId(null);
    !currentBioId ? addBio() : updateBio();
    clearInputBio();
  };

  // const removeBio = (id) => {
  //   setBioInfo(bioInfo.filter((bio) => bio.id !== id));
  // };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem("Bio", JSON.stringify([...bioInfo]));
    }
  }, [bioInfo]);

  useEffect(() => {
    if (localStorage.getItem("Bio") !== null) {
      const newBio = localStorage.getItem("Bio");
      setBioInfo(JSON.parse([...bioInfo, newBio]));
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSumbit}>
        <Form.Input
          width={6}
          required
          label="Name"
          type="text"
          placeholder="My name is..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.TextArea
          required
          width={6}
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
      {bioInfo.map((bio) => (
        <Card key={bio.id}>
          <Card.Content>
            <Card.Header>{bio.bioName}</Card.Header>
            <Card.Description>{bio.bioAboutMe}</Card.Description>
          </Card.Content>
          {/* <button onClick={() => removeBio(bio.id)}>Delete</button> */}
          <Button onClick={() => editBio(bio)}>Edit</Button>
        </Card>
      ))}
    </Container>
  );
}

export default AddBio;
