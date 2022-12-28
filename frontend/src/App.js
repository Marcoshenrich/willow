
import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import BenchIndex from "./components/BenchIndex";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      <NavBar/>
      <Hero/>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/">
          <BenchIndex/>
        </Route>
      </Switch>
    </>
  );
}





export default App;