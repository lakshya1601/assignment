import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveData: true,
      Users: [],
    };
  }

  FetchData = async () => {
    try {
      console.log("fetching...");
      this.setState({
        haveData: false,
      });
      let res = await axios.get("https://reqres.in/api/users?page=1");
      console.log("res", res);

      if (res.data.data) {
        console.log("success fetching data", res.data.data);
        setTimeout(() => {
          this.setState({
            Users: res.data.data,
            haveData: true,
          });
        }, 600);
      } else {
        throw { message: "Somehting went wrong..." };
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  render() {
    return (
      <div>
        <nav>
          <h1 classNameName="Header">Facebook</h1>
          <button
            className="btn"
            onClick={this.FetchData}
            type="button"
            disabled={!this.state.haveData}
          >
            Get Users
          </button>
        </nav>

        <div className="row">
          {!this.state.haveData ? <div className="loader"></div> : null}
          {this.state.Users.length === 0 && this.state.haveData ? (
            <div style={{ textAlign: "center", fontSize: "30px" }}>No Data</div>
          ) : null}
          {this.state.haveData &&
            this.state.Users.map((user) => {
              return _Card(user);
            })}
        </div>
      </div>
    );
  }
}

export default App;

const _Card = (data) => {
  return (
    <>
      <div className="card" style={{ width: "455px" }}>
        <img
          className="card-img-top"
          src={data.avatar}
          alt="Card"
          style={{ width: "50%" }}
        />
        <div className="card-body">
          <h4 className="card-title">{`${data.first_name} ${data.last_name}`}</h4>
          <p className="card-text">{data.email}</p>
        </div>
      </div>
    </>
  );
};
