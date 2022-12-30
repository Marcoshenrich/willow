
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import ListingsIndex from "./components/ListingsIndex";
import ListingShowPage from "./components/ListingShowPage";


function App() {


  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/listings/1" component={ListingShowPage} />
        <Route path="/listings" component={ListingsIndex} />
        <Route path="/" component={SplashPage}/>
      </Switch>
    </>
  );
}





export default App;