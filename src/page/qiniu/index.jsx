import React, { Component } from 'react';
import { message, Table, Button, Popover, Icon, Spin, Input, Drawer, Upload } from 'antd';
import clipboard from 'copy-to-clipboard';
import api from "../../api/";
import base from "../../http/base"

import "./scss/index.min.css"

const { Search } = Input;
const { Dragger } = Upload;

class Qiniu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			marker: '',
			prefix: '',	// 前缀
			list: [],
			DrawShow: false
		};
	}

	componentDidMount() {
		this.getList(1)
	}

	render() {

		const columns = [
			{
				title: '文件名',
				dataIndex: 'key',
				key: 'key',
			}, {
				title: '文件类型',
				dataIndex: 'mimeType',
				key: 'mimeType',
			}, {
				title: '文件大小',
				dataIndex: 'fsize',
				key: 'fsize',
				render: (text, record) => (
					<span>
						{
							this.sizeConvert(text)
						}
					</span>
				)
			}, {
				title: '储存类型',
				dataIndex: 'type',
				key: 'type',
				render: (text, record) => {
					if(text === 0){
						return (
							<span>标准存储</span>
						)
					} else if (text === 1) {
						return (
							<span>低频存储</span>
						)
					} else {
						return (
							<span>归档存储</span>
						)
					}
				}
			}, 	{
				title: '储存状态',
				dataIndex: 'status',
				key: 'status',
				render: (text, record) => {
					if(text === 0){
						return (
							<span>启用</span>
						)
					} else {
						return (
							<span>禁用</span>
						)
					}
				}
			}, {
				title: '更新时间',
				dataIndex: 'putTime',
				key: 'putTime',
				render: (text, record) => (
					<span>
						{
							this.timeConvert(text)
						}
					</span>
				)
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => {
					const previewImg = (text) =>{
						let type = text.mimeType.split('/')[0];

						if(type === 'image') {
							return (
								<div className="preview-popover-box"> 
									<img className="img" src={base.static+text.key} alt="预览图" ></img>
								</div>
							)
						} else {
							return (
								<div className="text-center">不支持预览</div>
							)
						}
					}
					return (
						<span>
							<Popover 
								content={
									previewImg(text)
								} 
								title="preview" 
								trigger="click" 
							>
								<Button type="link" >
									<Icon type="eye" />
								</Button>
							</Popover>
							<Button type="link" className="copy-btn" onClick={this.copy.bind(this, text)} >
								<Icon type="copy" />
							</Button>
						</span>
					)
				}
			}
		];

		const BottomLoad = () => {
			let loading = this.state.loading;
			let marker = this.state.marker;
			if(loading && marker) {
				return (
					<Spin />
				)
			} else if(!loading && marker) {
				return (
					<Button type="primary" shape="round" ghost onClick={this.loadingMore.bind(this)} >加载更多</Button>
				)
			} else {
				return (
					<div>没有更多了~</div>
				)
			}
		};

		return (
			<div>
				<div className="list-opt-btn clearfix">
					<div className="pull-left">
						<Button className="btn" type="primary" onClick={this.drawOpen.bind(this)} >上传文件</Button>
						<Button className="btn" onClick={this.refresh.bind(this)}>刷新列表</Button>
					</div>
					<div className="pull-right">
					<Search
						placeholder="文件前缀"
						onSearch={this.search.bind(this)}
						style={{ width: 300 }}
					/>
					</div>
				</div>
				
				<Table
					dataSource={this.state.list}
					columns={columns}
					pagination={false}
					rowClassName={this.setRowClass}
				/>
				{/* bottom loading start */}
				<div className="spin-box"> 
					<BottomLoad />
				</div>
				{/* bottom loading end */}
				{/* 抽屉 start */}
				<Drawer
          title="Upload"
          placement="bottom"
          closable={true}
          onClose={this.drawClose.bind(this)}
					visible={this.state.DrawShow}
        >
					<Dragger 
						multiple
						name="file"
						beforeUpload={this.beforeUpload.bind(this)}
					>
						<p className="ant-upload-drag-icon">
							<Icon type="inbox" />
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload. Strictly prohibit from uploading company data or other
							band files
						</p>
					</Dragger>
        </Drawer>
				{/* 抽屉 end */}
			</div>
		)
	}

	getList(page, type='') {
		this.setState({ loading: true });
		let formData = {
			prefix: '',
			marker: ''
		};
		if(this.state.marker && page !== 1) {
			formData.marker = this.state.marker
		};
		if(this.state.prefix) {
			formData.prefix = this.state.prefix
		};
		api.qiniu.getQiniuList(formData)
			.then(res => {
				if (res.data.code === 0) {
					let resData = res.data.data;
					let list = resData.items;
					if(page !== 1) {
						list = [...this.state.list, ...resData.items];
					};
					let marker = '';
					if(resData.marker) {
						marker = resData.marker
					}
					this.setState({
						list: list,
						marker: marker
					});
					message.success('加载成功！');
				} else {
					message.error('加载失败！');
					this.setState({
						list: [],
						marker: ''
					});
				};
				this.setState({ loading: false });
			})
			.catch(err => {
				this.setState({ loading: false });
			})
	};

	timeConvert(val) {
		let putTime = String(val);
		let subTime = putTime.substring(0, 13);
		let numTime = parseFloat(subTime);
		let time = new Date(numTime).toLocaleString();
		return time;
	}

	sizeConvert(val) {
		let size = '';
		let kbVal = val / 1024;
		if (kbVal > 1024) {
			let mbVal = kbVal / 2014;
			size = mbVal.toFixed(2) + 'MB';
		} else {
			size = kbVal.toFixed(2) + 'KB';
		};
		return size;
	}

	copy(val) {
		let link = base.static + val.key
		if (clipboard(link)) {
			message.success("复制成功");
		} else {
			message.error("复制失败");
		}
	}

	loadingMore() {
		this.getList()
	}

	search(val) {
		console.log(val)
		this.setState({
			marker: '',
			prefix: val
		},() => {
			this.getList(1);
	 });
	}

	refresh(){
		this.setState({
			marker: ''
		});
		this.getList(1, 'refresh');
	}

	drawClose(){
		this.setState({
      DrawShow: false
		});
		console.log('drawClose');
	}

	drawOpen(){
		this.setState({
      DrawShow: true
    });
	}

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
		api.qiniu.getQiniuToken()
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
		// console.log(token);
		// console.log(file)
		const fileType = file.type.split('/')[1];
		let timestamp = Date.parse(new Date())
    let randomNum = Math.floor(Math.random() * 1000)
    // 文件名
		const keyname = `temp/${timestamp}${randomNum}.${fileType}`
		let formData = new FormData();
		formData.append('file', file);
		formData.append('token', token);
		formData.append('key', keyname);
		api.qiniu.qiniuUploadFile(formData)
		.then(res => {
			// let imageUrl = `${base.static}${res.data.key}`
			// this.setState({
			// 	imageUrl,
			// 	loading: false,
			// })

			let obj = {
				key: res.data.key,
				hash: res.data.hash,
				fsize: file.size,
				mimeType: file.type,
				putTime: new Date().getTime(),
				type: 0,
				status: 0,
				md5: '',
				uploadType: 'new'
			};
			let list = this.state.list;
			this.setState({
				list: [obj, ...list],
				DrawShow: false
			});
			message.success('上传成功');
		})
		.catch(err => {
			console.log(err)
			// this.setState({ loading: false });
			message.error('上传失败');

		})
	}

	setRowClass(record, index){
		return ( record.uploadType === 'new' ? 'success-row' : '')
	}

};

export default Qiniu;