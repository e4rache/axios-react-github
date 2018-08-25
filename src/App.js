import React, { Component } from "react";
import Axios from "axios";

import "./App.css";
import UserForm from "./components/UserForm";

// https://api.github.com/users/john

class App extends Component {
  state = {
    repos: undefined,
    avatarUrl: undefined,
    gitHubUrl: undefined,
    errorMessage: undefined
  };

  setErrorMessage(message) {
    this.setState({
      repos: undefined,
      avatarUrl: undefined,
      gitHubUrl: undefined,
      errorMessage: message
    });
  }

  getUser = e => {
    e.preventDefault();
    const user = e.target.elements.username.value;
    if (user) {
      Axios.get(`https://api.github.com/users/${user}`)
        .then(res => {
          if (res.data.login) {
            const { public_repos, avatar_url, html_url } = res.data;
            this.setState({
              repos: public_repos,
              avatarUrl: avatar_url,
              githubUrl: html_url,
              errorMessage: undefined
            });
          } else {
            this.setErrorMessage(res.data.message);
          }
        })
        .catch(error => {
          if (error.response) {
            this.setErrorMessage(
              error.response.data.message + " " + error.response.status
            );
          } else {
            this.setErrorMessage(
              "something went wrong with the request. Check console logs to investigate."
            );
            console.log(error);
          }
        });
    } else {
      this.setErrorMessage("please enter a username");
    }
  };

  render() {
    const { repos, avatarUrl, githubUrl, errorMessage } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">𝔸𝕩𝕚𝕠𝕤 / ℝ𝕖𝕒𝕔𝕥 / 𝔾𝕚𝕥𝕙𝕦𝕓 𝔸ℙ𝕀</h1>
        </header>

        <p className="App-intro">( ͡° ͜ʖ ͡°)</p>

        <UserForm getUser={this.getUser} />

        {repos !== undefined ? <p>Number of Repos : {repos}</p> : <p />}

        {avatarUrl ? (
          <a href={githubUrl}>
            <img src={avatarUrl} alt="click to visit github" />{" "}
          </a>
        ) : (
            <p />
          )}

        {errorMessage ? <p>{errorMessage}</p> : <p />}
      </div>

    );
  }
}

export default App;
