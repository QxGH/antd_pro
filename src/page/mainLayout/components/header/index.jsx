import React, { Component } from 'react'

import { Layout, Menu, Icon } from 'antd'
const { Header } = Layout
const { SubMenu } = Menu

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  }

  onChangeState = () => {
		this.props.setParentState()
	};

  render() {
    return (
      <Header className={`MainHeader ${this.props.collapsed ? 'sider-collapsed' : ''}`}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.onChangeState}
        />
        <Menu mode="horizontal" className="MainHeaderMenu">
          <Menu.Item key="mail">
            <Icon type="mail" />
              Navigation One
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>
            }
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default MainHeader;