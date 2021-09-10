import React, { Component } from "react";
import Service from "../client/service";
import {firebase_db, storage} from "../Firebase/firebase";

export default class AddClient extends Component {
  imageObj = [];
  imageArray = [];
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeWeb = this.onChangeWeb.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeLatitude = this.onChangeLatitude.bind(this);
    this.onChangeLongitude = this.onChangeLongitude.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.newClient = this.newClient.bind(this);


    this.state = {
      category:"",
      dbpath:"",
      Name: "n/a",
      Email: "n/a",
      Website: "n/a",
      PhoneNo: "n/a",
      Latitude:"n/a",
      Longitude:"n/a",
      Image: null,
      progress:0,
      submitted: false,
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(
        {Image: image}
      );
    }
  };


  handleImageUpload = () => {
    const { image } = this.state.Image;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };

  handleCategory = (e) =>{
    this.setState({category: e.target.value});
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value,
    });
  }
  onChangeWeb(e) {
    this.setState({
      Website: e.target.value,
    });
  }
  onChangePhone(e) {
    this.setState({
      PhoneNo: e.target.value,
    });
  }
  onChangeLatitude(e) {
    this.setState({
      Latitude: e.target.value,
    });
  }
  onChangeLongitude(e) {
    this.setState({
      Longitude: e.target.value,
    });
  }



  //
  //
  //
  // onChangeImage(e){
  //   this.imageObj.push(e.target.files)
  //   for (let i = 0; i < this.imageObj[0].length; i ++){
  //     this.imageArray.push(URL.createObjectURL(this.imageObj[0][i]))
  //   }
  //   this.setState({ Image: this.imageArray});
  // }


  saveClient() {
      let data = {
        Name: this.state.Name,
        Email: this.state.Email,
        Website: this.state.Website,
        PhoneNo: this.state.PhoneNo,
        Latitude: this.state.Latitude,
        Longitude: this.state.Longitude,
        Image: this.state.Image,
        progress:this.state.progress,
      };

      let category = this.state.category;
      // console.log({category});
      let db = firebase_db.ref("/Hotels/Hotels_list");
      if (category == "Restaurant"){
        db = firebase_db.ref("/Restaurants/Restaurants_list");
      };
      if (category == "Hotel"){
        db = firebase_db.ref("/Hotels/Hotels_list");
      };

      if (category == "Agency"){
        db = firebase_db.ref("/Agencies/Agencies_list");
      };
      if (category == "Transport"){
        db = firebase_db.ref("/Transports/Transports_list");
      };

      Service.create(db,data)
        .then(() => {
          console.log("Created new item successfully!");
          this.setState({
            submitted: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
  }

  newClient() {
    this.setState({
      Name: "",
      Email: "",
      Website: "",
      PhoneNo: "",
      Latitude: "",
      Longitude: "",
      Image: [null],
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">

        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newClient}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="category">Select a Category to add</label>
                <div>
                    <select value={this.state.category}  onChange={this.handleCategory}>
                            <option value="Hotel">Hotel</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Agency">Agency</option>
                            <option value="Transport">Transport</option>
                      </select>
                </div>
            </div>

            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                required
                value={this.state.Name}
                onChange={this.onChangeName}
                name="Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                id="Email"
                required
                value={this.state.Email}
                onChange={this.onChangeEmail}
                name="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Website">Website</label>
              <input
                type="text"
                className="form-control"
                id="Website"
                required
                value={this.state.Website}
                onChange={this.onChangeWeb}
                name="Website"
              />
            </div>


            <div className="form-group">
              <label htmlFor="PhoneNo">PhoneNo</label>
              <input
                type="text"
                className="form-control"
                id="PhoneNo"
                required
                value={this.state.PhoneNo}
                onChange={this.onChangePhone}
                name="PhoneNo"
              />
            </div>


            <div className="form-group">
              <label htmlFor="Email">Latitude</label>
              <input
                type="text"
                className="form-control"
                id="Latitude"
                required
                value={this.state.Latitude}
                onChange={this.onChangeLatitude}
                name="Latitude"
              />
            </div>


            <div className="form-group">
              <label htmlFor="Email">Longitude</label>
              <input
                type="text"
                className="form-control"
                id="Longitude"
                required
                value={this.state.Longitude}
                onChange={this.onChangeLongitude}
                name="Longitude"
              />
            </div>


            <br/>
            <h2 className="green-text">React Firebase Image Uploader</h2>
            <br/>
            <br/>
            <div className="row">
              <progress value={this.state.progress} max="100" className="progress" />
            </div>
            <br />
            <br />
            <br />
            <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={this.handleChange} />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
            </div>
            <button
              onClick={this.handleImageUpload}
              className="waves-effect waves-light btn"
            >
              Upload
            </button>
            <br />
            <br />
            <img
              src={this.state.url || "https://via.placeholder.com/400x300"}
              alt="Uploaded Images"
              height="300"
              width="400"
              />

            <button onClick={this.saveClient} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
