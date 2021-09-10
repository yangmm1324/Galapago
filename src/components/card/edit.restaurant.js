import React, { Component } from "react";
import Service from "../client/service";
import {firebase_db} from "../Firebase/firebase";

let db = firebase_db.ref("/Restaurants/Restaurants_list");

export default class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeWeb = this.onChangeWeb.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        key: null,
        Name: "n/a",
        Email: "n/a",
        Website: "n/a",
        PhoneNo: "n/a",
        Latitude:"n/a",
        Longitude:"n/a",
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { client } = nextProps;
    if (prevState.currentClient.key !== client.key) {
      return {
        currentClient: client,
        message: ""
      };
    }

    return prevState.currentClient;
  }

  componentDidMount() {
    this.setState({
      currentClient: this.props.client,
    });
  }

  onChangeName(e) {
    const Name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          Name: Name,
        },
      };
    });
  }

  onChangeEmail(e) {
    const Email = e.target.value;

    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        Email: Email,
      },
    }));
  }


  onChangeWeb(e) {
    const Website = e.target.value;

    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        Website: Website,
      },
    }));
  }


  onChangePhone(e) {
    const PhoneNo = e.target.value;

    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        PhoneNo: PhoneNo,
      },
    }));
  }

  onChangeLongitude(e) {
    const Longitude = e.target.value;

    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        Longitude: Longitude,
      },
    }));
  }

  onChangeLatitude(e) {
    const Latitude = e.target.value;

    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        Latitude: Latitude,
      },
    }));
  }

  updateClient() {
    const data = {
      Name: this.state.currentClient.Name,
      Email: this.state.currentClient.Email,
      Website: this.state.currentClient.Website,
      PhoneNo: this.state.currentClient.PhoneNo,
      Latitude: this.state.currentClient.Latitude,
      Longitude: this.state.currentClient.Longitude,

    };

    Service.update(db,this.state.currentClient.key, data)
      .then(() => {
        this.setState({
          message: "The client was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteClient() {
    Service.delete(db,this.state.currentClient.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div>
        <h4>Client</h4>
        {currentClient ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={currentClient.Name}
                  onChange={this.onChangeName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  value={currentClient.Email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Website">Website</label>
                <input
                  type="text"
                  className="form-control"
                  id="Website"
                  value={currentClient.Website}
                  onChange={this.onChangeWeb}
                />
              </div>

              <div className="form-group">
                <label htmlFor="PhoneNo">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="PhoneNo"
                  value={currentClient.PhoneNo}
                  onChange={this.onChangePhone}
                />
              </div>


              <div className="form-group">
                <label htmlFor="Latitude">Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="Latitude"
                  value={currentClient.Latitude}
                  onChange={this.onChangeLatitude}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Longitude">Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="Longitude"
                  value={currentClient.Longitude}
                  onChange={this.onChangeLongitude}
                />
              </div>


            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteClient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateClient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Client...</p>
          </div>
        )}
      </div>
    );
  }
}
