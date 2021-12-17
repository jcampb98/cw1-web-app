/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import { Link, Route, Switch} from "react-router-dom";
import Hostels from "./components/hostels.js";
import ViewItineraries from "./components/ViewItineraries.js";
import './App.css';
import './Navbar.css';
import StockPhoto from './images/scotland-stock-photo.png'

const Home = () => (
  <div class="home-page">
    <h2>Home</h2>
    <div class="welcome-row">
      <div className="welcome-column">
        <p className="welcome-text">
          The North Coast 500 is a 516-mile scenic route around the north coast of Scotland.
          Among the accommodation available for tourists exploring the route, youth hostels are a useful
          option for travellers on a budget. It would useful for NC500 hostellers to have a web app to plan
          their itinerary, including the hostels they would like to stay at and for how long, and to be able to
          view their itinerary at a glance and see the distances they will need to travel at each stage of the
          trip. 
        </p>
      </div>
      <div className="welcome-column">
        <img src={StockPhoto} alt="A Photo of a hillside in Scotland"
          width="400" height="600" />
      </div>
    </div>  
  </div>
)

class App extends Component {
  render(){
    return (
          <div>
            <div className="topnav">
              <ul className="navbar-list">
                <li className="navbar-link">
                  <Link to="/">Home</Link>
                </li>
                <li className="navbar-link">
                  <Link to="/hostels">Hostels</Link>
                </li>
                <li className="navbar-link">
                  <Link to="/itineraries">Itineraries</Link>
                </li>
              </ul>
            </div>

            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/hostels"><Hostels /></Route>
              <Route path="/itineraries"><ViewItineraries/></Route>
            </Switch>

          </div>
    );
  }
}

export default App;
