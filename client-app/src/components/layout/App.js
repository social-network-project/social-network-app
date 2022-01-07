import React from "react";
import { Route } from "react-router-dom";
import LoginForm from "../LoginForm";
import NavBar from "./NavBar";
//import InterestDashboard from "../interests/dashboard/InterestDashboard";
//import InterestDetails from "../interests/details/InterestDetails";

function App() {
  return (
    <>
      <Route path="/" component={LoginForm} />
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
    </>
  );
}

export default App;
