import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from '../home';
import User from '../user';
import UploadImage from '../uploadImage';


import './scss/index.min.css';

import MainSider from './components/sider'
import MainHeader from './components/header'
import MainFooter from './components/footer'

import { Layout, Breadcrumb } from 'antd'
const {  Content } = Layout


class MainLayout extends Component {
	state = {
		collapsed: false,
		breadcrumb: ['Home']
	};

	onMenuToggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	componentDidMount(){
		this.props.history.listen((e)=>{
			let path = e.pathname;
			if(path === '/user') {
				this.setState({
					breadcrumb: ['User']
				})
			} else if(path === '/uploadImage') {
				this.setState({
					breadcrumb: ['UploadImage']
				})
			} else {
				this.setState({
					breadcrumb: ['Home']
				})
			}
		})
	}

	render() {
		return (
			<div className="MainLayout">
				<Layout>
					<MainSider collapsed={this.state.collapsed} history={this.props.history} />
					<Layout>
						<MainHeader collapsed={this.state.collapsed} setParentState={this.onMenuToggle} history={this.props.history} />
						<Content className="MainContent">
							<Breadcrumb style={{ margin: '16px 0' }}>
								{
									this.state.breadcrumb.map((item, index) => {
										return (
										<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
										)
									})
								}
							</Breadcrumb>
							<div className="MainBody">
								{/* Content Router Start */}
								<Route exact path="/" component={Home} />
								<Route path="/user" component={User} />
								<Route path="/uploadImage" component={UploadImage} />
								{/* Content Router End */}
							</div>
						</Content>
						<MainFooter />
					</Layout>
				</Layout>
			</div>
		)
	}
};

export default MainLayout;