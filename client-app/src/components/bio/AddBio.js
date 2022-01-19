import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Card, Icon, Image } from "semantic-ui-react";
import BioForm from "./BioForm";

function AddBio(
  users,
  setUsers,
  connectedUserId,
  setConnectedUserId,
  loadUserById,
) {
  // const firstRender = useRef(true);

  const [displayName, setDisplayName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [bioImage, setBioImage] = useState(null);
  const [bioImgData, setBioImgData] = useState(null);
  const [currentBioId, setCurrentBioId] = useState("");
  const [bioEditOpen, setBioEditOpen] = useState(false);
  const [bioInfo, setBioInfo] = useState([]);

  const clearInputBio = () => {
    setDisplayName("");
    setAboutMe("");
  };

  // const addBio = () => {
  //   setBioInfo([
  //     ...bioInfo,
  //     {
  //       bioName: displayName,
  //       bioAboutMe: aboutMe,
  //       id: uuidv4(),
  //     },
  //   ]);
  //   clearInputBio();
  // };

  const removeSelectedImage = () => {
    setBioImage(null);
  };

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

  const editBio = (bio) => {
    setBioEditOpen((bioEditOpen) => !bioEditOpen);
    setDisplayName(bio.displayName);
    setAboutMe(bio.aboutMe);
    setCurrentBioId(bio.id);
  };

  // const updateBioOld = () => {
  //   setBioInfo([
  //     ...bioInfo.filter((ed) => ed.id !== currentBioId),
  //     {
  //       bioName: displayName,
  //       bioAboutMe: aboutMe,
  //       id: currentBioId,
  //     },
  //   ]);
  //   setBioEditOpen(false);
  // };

  const handleSumbit = (e) => {
    e.preventDefault();
    setCurrentBioId(null);
    !currentBioId ? bioToServer() : updateBio(currentBioId);
    clearInputBio();
  };

  // const removeBio = (id) => {
  //   setBioInfo(bioInfo.filter((bio) => bio.id !== id));
  // };

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //   } else {
  //     localStorage.setItem("Bio", JSON.stringify([...bioInfo]));
  //   }
  // }, [bioInfo]);

  // useEffect(() => {
  //   loadBio();
  // }, []);

  const bioToServer = () => {
    loadUserById();
    fetch(
      { connectedUserId },
      {
        method: "POST",
        body: JSON.stringify({
          id: uuidv4(),
          image: bioImgData,
          displayName: displayName,
          bio: aboutMe,
        }),
      },
    )
      .then((res) => res.json())
      .then((result) => {
        setBioInfo([
          ...bioInfo,
          {
            displayName: result.displayName,
            aboutMe: result.aboutMe,
            id: result.id,
            userImage: result.bioImgData,
          },
        ]);
      })
      .catch((error) => {
        console.log("Error adding profile info.", error);
      });
  };

  const loadBio = () => {
    loadUserById();
    fetch({ connectedUserId })
      .then((res) => res.json())
      .then((data) => {
        setBioInfo(data);
      })
      .catch((error) => console.log("Error fetching profile", error));
  };

  const updateBio = () => {
    fetch(`/users/${currentBioId}`, {
      method: "PUT",
      body: JSON.stringify({
        displayName: displayName,
        bio: aboutMe,
        userImage: bioImgData,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBioInfo([...bioInfo.filter((x) => x.id !== currentBioId), result]);
      })
      .catch((error) => {
        console.log("Profile not found", error);
      });
  };

  return (
    <Container>
      {bioInfo.map((bio) => (
        <Card key={bio.id}>
          <Button onClick={() => editBio(bio)}>
            <Icon name="pen square" />
          </Button>
          <Image size="small" src={bioImgData} />
          <Card.Content>
            <Card.Header>{bio.displayName}</Card.Header>
            <Card.Description>{bio.aboutMe}</Card.Description>
          </Card.Content>
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
              editBio={editBio}
            ></BioForm>
          )}
        </Card>
      ))}
    </Container>
  );
}

export default AddBio;
