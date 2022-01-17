import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import LoginForm from "../LoginForm";
import NavBar from "./NavBar";
import GroupDashboard from "../groups/dashboard/GroupDashboard";
import GroupFeed from "../groups/feed/GroupFeed";
import Profile from "../user/Profile";

function App() {
  const [interests, setInterests] = useState([]);
  const [users, setUsers] = useState([]);
  const connectedUser = useLocation();

  useEffect(() => {
    loadInterests();
    loadUsers();
    console.log(interests);
    console.log("welcome" + connectedUser);
  }, []);

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
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginForm users={users} setUsers={setUsers} />}
        />
        <Route
          exact
          path="/groups/:idUser"
          element={
            <>
              <NavBar /> <GroupDashboard interests={interests} />
            </>
          }
        />
        <Route
          exact
          path="/feed/:idGroup"
          element={
            <>
              <NavBar /> <GroupFeed interests={interests} users={users} />
            </>
          }
        />
        <Route
          exact
          path="/profile/:idUser"
          element={
            <>
              <NavBar /> <Profile />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
