import React, { Component } from "react";
import Service from "../client/service";
import {firebase_db} from "../Firebase/firebase";

import Client from "./edit.restaurant";
let db = firebase_db.ref("/Restaurants/Restaurants_list");

export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      clients: [],
      currentClient: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    Service.getAll(db).on("value", this.onDataChange);
  }

  componentWillUnmount() {
    Service.getAll(db).off("value", this.onDataChange);
  }

  onDataChange(items) {
    let clients = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      clients.push({
        key: key,
        Name: data.Name,
        Email: data.Email,
        Website: data.Website,
        PhoneNo: data.PhoneNo,
        Latitude: data.Latitude,
        Longitude: data.Longitude,
        published: data.published,
      });
    });

    this.setState({
      clients: clients,
    });
  }

  refreshList() {
    this.setState({
      currentClient: null,
      currentIndex: -1,
    });
  }

  setActiveClient(client, index) {
    this.setState({
      currentClient: client,
      currentIndex: index,
    });
  }

  removeAllClients() {
    Service.deleteAll(db)
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { clients, currentClient, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Restaurants List</h4>

          <ul className="list-group">
            {clients &&
              clients.map((client, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveClient(client, index)}
                  key={index}
                >
                  {client.Name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllClients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentClient ? (
            <Client
              client={currentClient}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a restaurant...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
