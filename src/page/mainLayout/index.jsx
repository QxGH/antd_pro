import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from '../home';
import User from '../user';
import UploadImage from '../uploadImage';
import Qiniu from '../qiniu';



import './scss/index.min.css';

import MainSider from './components/sider'
import MainHeader from './components/header'
import MainFooter from './components/footer'

import { Layout, Breadcrumb } from 'antd'
const { Content } = Layout


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

	componentDidMount() {
		this.props.history.listen((e) => {
			let path = e.pathname;
			switch (path) {
				case '/user':
					this.setState({
						breadcrumb: ['User']
					});
					break;
				case '/uploadImage':
					this.setState({
						breadcrumb: ['UploadImage']
					});
					break;
				case '/qiniu':
					this.setState({
						breadcrumb: ['Qiniu']
					});
					break;	
				default:
					this.setState({
						breadcrumb: ['Home']
					});
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
								<Route path="/qiniu" component={Qiniu} />
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