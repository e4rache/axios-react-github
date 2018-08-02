import React, { Component } from "react";

class UserForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.getUser}>
        <label>
          username
          <input type="text" name="username" />
        </label>
        <button>get</button>
      </form>
    );
  }
}

export default UserForm;
