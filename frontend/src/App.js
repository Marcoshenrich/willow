
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import ListingsIndex from "./components/ListingsIndex";
import ListingShowPage from "./components/ListingShowPage";
import AgentShowPage from "./components/AgentShowPage";

function App() {


  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/listings/:listingId" component={ListingShowPage}/>
        <Route path="/agents/:userId" component={AgentShowPage} />
        <Route path="/listings" component={ListingsIndex} />
        <Route path="/" component={SplashPage}/>
      </Switch>
    </>
  );
}





export default App;