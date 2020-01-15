import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu


class MainSider extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Sider className="MainSider" breakpoint="lg" trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
          <Menu.Item key="home" onClick={this.routeTo.bind(this, '/')}>
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <SubMenu
            key="upload"
            title={
              <span>
                <Icon type="upload" />
                <span>Upload</span>
              </span>
            }
          >
            <Menu.Item key="qiniu" onClick={this.routeTo.bind(this, '/qiniu')} >Qiniu</Menu.Item>
            <Menu.Item key="uploadImage" onClick={this.routeTo.bind(this, '/uploadImage')} >Upload Image</Menu.Item> 
          </SubMenu>
          <Menu.Item key="user" onClick={this.routeTo.bind(this, '/user')}>
            <Icon type="user" />
            <span>User</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }

  routeTo(route) {
    this.props.history.push({
      pathname: route
    })
  }
}

export default MainSider;