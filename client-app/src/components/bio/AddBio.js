import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Button, Container, Card, Icon, Image } from "semantic-ui-react";
import BioForm from "./BioForm";

function AddBio({
  users,
  setUsers,
  loadUserById,
  connectedUser,
  setConnectedUser,
}) {
  const [displayName, setDisplayName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [bioImage, setBioImage] = useState(null);
  const [bioImgData, setBioImgData] = useState(null);
  const [currentBioId, setCurrentBioId] = useState("");
  const [bioEditOpen, setBioEditOpen] = useState(false);
  const [bioInfo, setBioInfo] = useState([]);

  useEffect(() => {
    console.log("UseEffect");
    console.log(connectedUser);
    loadBio();
  }, []);

  const imageChange = (e) => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setBioImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setBioImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setBioImage(null);
    setBioImgData(null);
  };

  const editBio = (connectedUser) => {
    setBioEditOpen((bioEditOpen) => !bioEditOpen);
    setDisplayName(displayName);
    setAboutMe(aboutMe);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    bioToServer(connectedUser);
    setBioEditOpen(false);
  };

  const loadBio = () => {
    fetch(`/users/${connectedUser}`)
      .then((res) => res.json())
      .then((data) => {
        setBioInfo(data);
      })
      .catch((error) => console.log("Error fetching profile", error));
  };

  const bioToServer = () => {
    fetch(`/users/${connectedUser}`, {
      method: "PUT",
      body: JSON.stringify({
        userImage: bioImgData,
        displayName: displayName,
        bio: aboutMe,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // setBioInfo(result);
        setBioInfo({
          displayName: result.displayName,
          bio: result.aboutMe,
          image: result.bioImgData,
        });
      })
      .catch((error) => {
        console.log("Error adding profile info.", error);
      });
  };

  return (
    <Container>
      {connectedUser && (
        <Card>
          <Button onClick={() => editBio()}>
            <Icon name="pen square" />
          </Button>
          <Image size="small" rounded centered src={bioImgData} />
          <Card.Content>
            <Card.Header>
              <Icon name="user" />
              {displayName}
            </Card.Header>
            <Card.Description>{aboutMe}</Card.Description>
          </Card.Content>
        </Card>
      )}
      {/* <button onClick={() => removeBio(bio.id)}>Delete</button> */}
      {bioEditOpen && (
        <BioForm
          displayName={displayName}
          setDisplayName={setDisplayName}
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
          currentBioId={currentBioId}
          bioImage={bioImage}
          removeSelectedImage={removeSelectedImage}
          imageChange={imageChange}
          handleSumbit={handleSumbit}
        ></BioForm>
      )}
    </Container>
  );
}

export default AddBio;
