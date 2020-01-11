import React, { Component } from 'react'

import { Layout, Menu, Icon, Avatar, Dropdown, Tooltip } from 'antd'
const { Header } = Layout


class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchStatus: false,
      searchInputVal: ''
    }
  };

  onChangeState = () => {
    this.props.setParentState()
  };

  searchTaggle = () => {
    let inputWidth = this.refs.searchInput.width;
    if(inputWidth === 0) {
      this.setState({
        searchStatus: true
      });
      this.refs.searchInput.focus();
    } else {
      this.setState({
        searchStatus: false,
        searchInputVal: ''
      })
    };
  };

  searchInputBlur = () => {
    this.setState({
      searchStatus: false,
      searchInputVal: ''
    })
  };

  searchInputChange = (e) => {
    this.setState({
      searchInputVal: e.target.value
    })
  };

  onkeydown = (e) => {
    if(this.state.searchStatus && this.state.searchInputVal !== '' && e.nativeEvent.keyCode === 13) {
      let href = `https://www.baidu.com/s?wd=${this.state.searchInputVal}`;
      let newWindow = window.open();
      newWindow.location.href = href;
    }
  };

  render() {
    const DropdownMenu = (
      <Menu>
        <Menu.Item>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item>
          <Icon type="setting" />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={this.logout.bind(this)}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className={`MainHeader ${this.props.collapsed ? 'sider-collapsed' : ''}`}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.onChangeState}
        />
        <ul className="MainHeaderMenu">
          <li className="item no-hover">
            <div className="search-box">
              <Icon type="search" onClick={this.searchTaggle} />
              <input type="text" ref="searchInput" onKeyPress={this.onkeydown} onBlur={this.searchInputBlur} onChange={this.searchInputChange} value={this.state.searchInputVal} className={`search-input ${this.state.searchStatus ? 'focus' : ''}`} placeholder="搜索" />
            </div>
          </li>
          <li className="item">
            <Tooltip placement="bottom" title="github">
              <a target="_blank" className="icon-box" rel="noopener noreferrer" href="https://github.com/QxGH">
                <Icon type="github" />
              </a>
            </Tooltip>
          </li>
          <li className="item">
            <Tooltip placement="bottom" title="使用文档">
              <a target="_blank" className="icon-box" rel="noopener noreferrer" href="https://ant.design/index-cn">
                <Icon type="question-circle" />
              </a>
            </Tooltip>
          </li>
          <li className="item">
            <Dropdown overlay={DropdownMenu} placement="bottomRight">
              <div>
                <Avatar className="avatar-box" src="https://qxtodo.com/avatar.jpg" />
                <span className="name-box">Wook</span>
              </div>
            </Dropdown>
          </li>
        </ul>
      </Header>
    )
  }

  componentDidUpdate(){
    // document.addEventListener('keyup', this.onkeydown.bind(this));
  }

  // componentWillUnmount() {
  //   document.removeEventListener('keyup', this.onkeydown.bind(this))
  // }

  // 退出登录
  logout(){
    console.log()
    localStorage.removeItem("token");
    this.props.history.push({
      pathname: '/login'
    })
  }
  
}

export default MainHeader;