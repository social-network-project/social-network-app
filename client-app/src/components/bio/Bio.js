import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function Bio() {
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
    <div>
      <form onSubmit={handleSumbit}>
        <label>Name</label>
        <input
          className="subjectInput"
          type="text"
          placeholder="My name is..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="captionLabel">About me</label>
        <input
          className="captionInput"
          type="text"
          placeholder="About me..."
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />

        <button type="submit" className="postBtn">
          {currentBioId !== null ? "Update" : "Save"}
        </button>
      </form>
      {bioInfo.map((bio) => (
        <div key={bio.id}>
          <h2>{bio.bioName}</h2>
          <p>{bio.bioAboutMe}</p>
          {/* <button onClick={() => removeBio(bio.id)}>Delete</button> */}
          <button onClick={() => editBio(bio)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default Bio;
