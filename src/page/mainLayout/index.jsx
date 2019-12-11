import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Home from '../home';
import User from '../user';

import './scss/index.min.css';

import MainSider from './components/sider'
import MainHeader from './components/header'
import MainFooter from './components/footer'

import { Layout, Breadcrumb } from 'antd'
const {  Content } = Layout


class MainLayout extends Component {
	state = {
		collapsed: false,
	};

	onMenuToggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<div className="MainLayout">
				<Layout>
					<MainSider collapsed={this.state.collapsed} />
					<Layout>
						<MainHeader collapsed={this.state.collapsed} setParentState={this.onMenuToggle}/>
						<Content className="MainContent">
							<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>User</Breadcrumb.Item>
								<Breadcrumb.Item>Bill</Breadcrumb.Item>
							</Breadcrumb>
							<div className="MainBody">
								{/* Content Router Start */}
								<Route exact path="/" component={Home} />
								<Route path="/user" component={User} />
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