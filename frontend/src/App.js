
import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import SplashPage from "./components/SplashPage";
import ListingsIndex from "./components/ListingsIndex";
import ListingShowPage from "./components/ListingShowPage";
import UserShowPage from "./components/UserShowPage";
import TestModule from "./components/TestModule";

function App() {


  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/listings/search/:query" component={ListingsIndex} />
        <Route path="/listings/:listingId" component={ListingShowPage}/>
        <Route path="/user/profile" component={UserShowPage} />
        <Route path="/listings" component={ListingsIndex} />
        <Route path="/test" component={TestModule} />
        <Route path="/" component={SplashPage}/>
      </Switch>
    </>
  );
}





export default App;