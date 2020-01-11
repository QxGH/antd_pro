import React, { Component } from 'react';
import { Upload, Icon, message, Alert } from 'antd';
import api from "../../api/";
import base from "../../http/base"

import "./scss/index.min.css"

class UploadImage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			imageUrl: ''
		};
	}

	render() {
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		const { imageUrl } = this.state;

		return (
			<div>
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					beforeUpload={this.beforeUpload.bind(this)}
				>
					{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
				</Upload>
				{imageUrl ? <Alert message={imageUrl} type="success" /> : ''}
			</div>
		)
	}

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
			return;
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
			return;
		}

		// return isJpgOrPng && isLt2M;
		this.getQiniuToken(file);
		return false;
	};

	getQiniuToken(file) {
		this.setState({ loading: true });
		api.common.getQiniuToken()
		.then(res => {
			if(res.data.code === 0) {
				this.uploadImageHandle(res.data.data, file)
			} else {
				message.error('获取七牛云 Token 失败！');
				this.setState({ loading: false });
			}
		})
		.catch(err => {
			this.setState({ loading: false });
			console.log(err)
		})
	}

	uploadImageHandle(token, file) {
		console.log(token);
		console.log(file)
		const fileType = file.type.split('/')[1];
		let timestamp = Date.parse(new Date())
    let randomNum = Math.floor(Math.random() * 1000)
    // 文件名
		const keyname = `temp/${timestamp}${randomNum}.${fileType}`
		let formData = new FormData();
		formData.append('file', file);
		formData.append('token', token);
		formData.append('key', keyname);
		api.common.qiniuUploadFile(formData)
		.then(res => {
			let imageUrl = `${base.static}${res.data.key}`
			this.setState({
				imageUrl,
				loading: false,
			})
		})
		.catch(err => {
			console.log(err)
			this.setState({ loading: false });
		})
		

	}

};

export default UploadImage;