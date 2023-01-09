
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import ListingsIndex from "./components/ListingsIndex";
import ListingShowPage from "./components/ListingShowPage";
import UserShowPage from "./components/UserShowPage";

function App() {


  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/listings/:listingId" component={ListingShowPage}/>
        <Route path="/user/profile" component={UserShowPage} />
        <Route path="/listings" component={ListingsIndex} />
        <Route path="/" component={SplashPage}/>
      </Switch>
    </>
  );
}





export default App;