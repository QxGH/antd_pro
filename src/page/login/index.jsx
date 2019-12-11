import React, { Component } from 'react'


class Login extends Component {
  render() {
    return (
      <div className="login">
        <h1>login</h1>
        <button onClick={() => this.props.history.push('/')}>Login</button>
      </div>
    )
  }
}

export default Login;