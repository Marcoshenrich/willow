
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import SessionModal from "./components/SessionModal";


function App() {
  const [showSessionModal, setShowSessionModal] = useState(false)


  return (
    <>
      <NavBar/>
      {showSessionModal && (<SessionModal />)}
      <Switch>
        <Route path="/">
      <Hero/>
        </Route>
      </Switch>
    </>
  );
}





export default App;