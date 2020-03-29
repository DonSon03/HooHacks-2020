import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Customer from "./component/Customer"
import Distributor from "./component/Distributor"

function App() {
  return (
    // <div className="App-header">
    <Router>
      <div>
      <Switch>

<Route path="/distributor">
  <Distributor />
</Route>

<Route path="/">
  <Customer />
</Route>

</Switch>
      </div>
    </Router>
    // </div>
  );
}

export default App;