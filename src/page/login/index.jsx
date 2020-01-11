import React, { Component } from 'react'

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import "./scss/index.min.css"
import hex_hmac_md5 from '../../libs/hex_hmac_md5'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <div className="login">
        <div className="login-content">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <Button type="link" className="forget-password" disabled >忘记密码</Button>

              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <Button type="link" disabled >注册</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          username: values.username,
          password: hex_hmac_md5(values.username, values.password) 
        };
        this.$http.login.login(data)
        .then(res => {
          if(res.data.code === 0) {
            console.log(res)
            localStorage.setItem('token', res.data.data.token);
            this.props.history.push({
              pathname: '/'
            })
          } else {
            message.error(res.data.msg)
          }
        })
      }
    });
  };

}

const LoginForm = Form.create()(Login);

export default LoginForm;