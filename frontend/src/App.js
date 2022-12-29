
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import BenchIndex from "./components/BenchIndex";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import SessionModal from "./components/SessionModal";


function App() {
  const [showSessionModal, setShowSessionModal] = useState(false)


  return (
    <>
      <NavBar/>
      <Hero/>
      {showSessionModal && (<SessionModal />)}
      <Switch>
        <Route path="/">
          <BenchIndex/>
        </Route>
      </Switch>
    </>
  );
}





export default App;