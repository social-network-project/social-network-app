import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Card, Icon } from "semantic-ui-react";
import BioForm from "./BioForm";

function AddBio() {
  const firstRender = useRef(true);

  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [currentBioId, setCurrentBioId] = useState("");
  const [bioInfo, setBioInfo] = useState([]);
  const [bioEditOpen, setBioEditOpen] = useState(false);

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
    setBioEditOpen((bioEditOpen) => !bioEditOpen);
    setName(bio.bioName);
    setAboutMe(bio.bioAboutMe);
    setCurrentBioId(bio.id);
  };

  const updateBio = () => {
    setBioInfo([
      ...bioInfo.filter((ed) => ed.id !== currentBioId),
      {
        bioName: name,
        bioAboutMe: aboutMe,
        id: currentBioId,
      },
    ]);
    setBioEditOpen(false);
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
      {bioInfo.map((bio) => (
        <Card key={bio.id}>
          <Button onClick={() => editBio(bio)}>
            <Icon name="pen square" />
          </Button>
          <Card.Content>
            <Card.Header>{bio.bioName}</Card.Header>
            <Card.Description>{bio.bioAboutMe}</Card.Description>
          </Card.Content>
          {/* <button onClick={() => removeBio(bio.id)}>Delete</button> */}
          {bioEditOpen && (
            <BioForm
              name={name}
              setName={setName}
              aboutMe={aboutMe}
              setAboutMe={setAboutMe}
              currentBioId={currentBioId}
              handleSumbit={handleSumbit}
              editBio={editBio}
            ></BioForm>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default AddBio;
