import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import NavBar from "./NavBar";
import InterestDashboard from "../interests/dashboard/InterestDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route
          exact
          path="/interests"
          element={
            <>
              <NavBar /> <InterestDashboard />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
