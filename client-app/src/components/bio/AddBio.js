import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const params = useParams();

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
    if (connectedUser.id !== params.idUser) {
      fetch(`/users/${connectedUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBioInfo(data);
        })
        .catch((error) => console.log("Error fetching profile", error));
    } else setBioInfo(connectedUser);
  };

  const bioToServer = () => {
    fetch(`/users/${connectedUser.id}`, {
      method: "PUT",
      body: JSON.stringify({
        userImage: bioImgData,
        displayName: displayName,
        bio: aboutMe,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBioInfo(result);
        setConnectedUser(result);
      })
      .catch((error) => {
        console.log("Error adding profile info.", error);
      });
  };

  return (
    <Container>
      {connectedUser && (
        <Card>
          <Image size="small" rounded centered src={bioImgData} />
          <Card.Content>
            <Card.Header>
              <Icon name="user" />
              {displayName}
            </Card.Header>
            <Card.Description>{aboutMe}</Card.Description>
            <Button onClick={() => editBio()}>
              <Icon name="pen square" />
            </Button>
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
