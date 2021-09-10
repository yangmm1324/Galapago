import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
import { Image, Button } from "react-bootstrap";

import AddHotel from "../components/card/add.component";
import addPage from "../components/card/add.page";
import HotelsList from "../components/card/hotel.list";
import RestaurantList from "../components/card/restaurant.list";
import TransportList from "../components/card/transport.list";
import AgencyList from "../components/card/agency.list";
import logo from "./logo.png"
import Navigation from "../components/Navigation/navigation";
import {auth} from "../components/Firebase/firebase";
import SignIn from "../components/sign-in/sign-in.component";
import SignUp from "../components/sign-up/sign-up.component";

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/clients" className="navbar-brand">
            Galapago
          </a>
          <div className="navbar-nav mr-auto">
            <Navigation/>
            <Button variant="dark" onClick={() => auth.signOut()}>Log out</Button>
          </div>
        </nav>
        <div className="container mt-3">
          <h2>GalapaGo!</h2>
          <Image width="125" className="rounded mx-auto d-block" src={logo} />

          <Switch>
            <Route exact path={"/hotel"} component={HotelsList} />
            <Route exact path={"/restaurant"} component={RestaurantList} />
            <Route exact path={"/agency"} component={AgencyList} />
            <Route exact path={"/transport"} component={TransportList} />
            <Route exact path={"/add"} component={addPage} />
            <Route exact path={"/signup"} component={SignUp}/>
            <Route exact path={"/signin"} component={SignIn}/>
          </Switch>
        </div>

      </div>

    );
  }
}

export default Home;
