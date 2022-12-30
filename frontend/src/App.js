
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SessionModal from "./components/SessionModal";
import SplashPage from "./components/SplashPage";



function App() {


  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/">
      <SplashPage/>
        </Route>
      </Switch>
    </>
  );
}





export default App;