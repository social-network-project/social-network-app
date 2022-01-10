import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import NavBar from "./NavBar";
//import InterestDashboard from "../interests/dashboard/InterestDashboard";
//import InterestDetails from "../interests/details/InterestDetails";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            {/*  <Container>
              <Route exact path="/interests" component={InterestDashboard} />
              <Route path="/interests/:id" component={InterestDetails} />
            </Container> */}
          </>
        )}
      />
      </Routes>
    </>

  );
}

export default App;
