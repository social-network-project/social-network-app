import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import NavBar from "../layout/Navbar/NavBar";
import GroupDashboard from "../groups/dashboard/GroupDashboard";
import GroupFeed from "../groups/feed/GroupFeed";
import Settings from "../layout/other-pages/Settings";
import NotFound from "../layout/other-pages/NotFound";
import AddPost from "../post/AddPost";
import AddBio from "../bio/AddBio";

function App() {
  const [interests, setInterests] = useState([]);
  const [users, setUsers] = useState([]);
  const [connectedUserId, setConnectedUserId] = useState(
    localStorage.getItem("connectedUser"),
  );
  const [connectedUser, setConnectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState({});

  useEffect(() => {
    loadInterests();
    loadUsers();
    loadUserById();
    console.log(interests);
    console.log("welcome" + connectedUserId);
  }, [connectedUserId]);

  function loadInterests() {
    fetch("/interests")
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
      })
      .catch((error) => console.log("Error fetching interests", error));
  }
  function loadUsers() {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log("Error fetching users", error));
  }
  function loadUserById() {
    if (connectedUserId) {
      fetch(`/users/${connectedUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setConnectedUser(data);
          console.log("connected user object");
          console.log(data);
        })
        .catch((error) => console.log("Error fetching user", error));
    }
  }
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginForm
              users={users}
              setUsers={setUsers}
              setConnectedUserId={setConnectedUserId}
            />
          }
        />
        <Route
          exact
          path="/addpost"
          element={<AddPost connectedUserId={connectedUserId} />}
        />
        <Route
          exact
          path="/groups/:idUser"
          element={
            <>
              <NavBar connectedUser={connectedUser} />{" "}
              <GroupDashboard interests={interests} />
            </>
          }
        />
        <Route
          exact
          path="/feed/:idGroup"
          element={
            <>
              <NavBar connectedUser={connectedUser} />{" "}
              <GroupFeed
                interests={interests}
                setInterests={setInterests}
                users={users}
                connectedUserId={connectedUserId}
                posts={posts}
                setPosts={setPosts}
                selectedInterest={selectedInterest}
                setSelectedInterest={setSelectedInterest}
              />
            </>
          }
        />
        <Route
          exact
          path="/profile/:idUser"
          element={
            <>
              <NavBar connectedUser={connectedUser} />{" "}
              <AddBio
                users={users}
                setUsers={setUsers}
                connectedUser={connectedUser}
                setConnectedUser={setConnectedUser}
              />
            </>
          }
        />
        <Route
          exact
          path="/settings/:idUser"
          element={
            <>
              <NavBar connectedUser={connectedUser} /> <Settings />
            </>
          }
        />
        <Route
          path="*"
          exact
          element={
            <>
              <NavBar connectedUser={connectedUser} />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
