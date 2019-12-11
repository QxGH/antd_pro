import React, { Component } from 'react';


class User extends Component {
	render() {
		return (
			<div>
				<div className="box">
					<button onClick={() => this.props.history.push({
						pathname: '/'
					})}>通过函数跳转 home</button>
				</div>
				<div className="box">
					<button onClick={() => this.props.history.goBack()}>返回</button>
				</div>
			</div>
		)
	}
	componentDidMount() {
		console.log(this.props.history.location.state)
	}
};

export default User;