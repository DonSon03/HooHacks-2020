import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Customer from "./component/Customer"
import CustomerHome from "./component/CustomerHome"
import DistributorHome from "./component/DistributorHome"

function App() {
  return (
    // <div className="App-header">
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Customer Home</Link>
            </li>
            <li>
              <Link to="/customer">Customer Dashboard</Link>
            </li>
            <li>
              <Link to="/distributor">Distributor Home</Link>
            </li>
          </ul>
        </nav> */}
      <Switch>
        
        <Route path="/distributor">
          <DistributorHome />
        </Route>

        <Route path="/">
          <CustomerHome />
        </Route>

      </Switch>
      </div>
    </Router>
    // </div>
  );
}

export default App;