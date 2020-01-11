import React, { Component } from 'react';
import './scss/index.min.css'

class Home extends Component {

  componentWillMount(){
    this.$http.home.index()
    .then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="home">
        <button onClick={() => this.props.history.push({
          pathname: '/user',
          state: {
            id: 3
          }
        })}>通过函数跳转 user</button>
        {/* <div className="rect"></div> */}
      </div>
    )
  }

};

export default Home;