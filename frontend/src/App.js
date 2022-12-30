
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SessionModal from "./components/SessionModal";
import SplashPage from "./components/SplashPage";
import ListingsIndex from "./components/ListingsIndex";



function App() {


  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/listings" component={ListingsIndex} />
        <Route path="/" component={SplashPage}/>
      </Switch>
    </>
  );
}





export default App;