import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../LoginForm";
import NavBar from "./NavBar";
import InterestDashboard from "../interests/dashboard/InterestDashboard";
import InterestDetails from "../interests/details/InterestDetails";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <>
      {/* <Routes>
      <Route path="/" element={<LoginForm />} />
        <Routes>
            <NavBar />
          <Route path="/interests" exact element={<InterestDashboard />} />
        </Routes>
      </Routes> */}
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route
          path={"/(.+)"}
          render={() => (
            <>
              <NavBar />
              <Container style={{ marginTop: "7em" }}>
                <Routes>
                  <Route
                    path="/interests"
                    element={<InterestDashboard />}
                  />
                </Routes>
              </Container>
            </>
          )}
         
        />
      </Routes>
    </>
  );
}

export default App;
