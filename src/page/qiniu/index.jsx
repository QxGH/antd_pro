import React, { Component } from 'react';
import { message, Table, Button, Popover, Icon, Spin } from 'antd';
import clipboard from 'copy-to-clipboard';
import api from "../../api/";
import base from "../../http/base"

import "./scss/index.min.css"

class Qiniu extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			marker: '',
			list: []
		};
	}

	componentDidMount() {
		this.index()
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
			const loading = this.state.loading;
			if(loading) {
				return (
					<Spin />
				)
			} else {
				return (
					<Button type="primary" shape="round" ghost onClick={this.loadingMore.bind(this)} >加载更多</Button>
				)
			}
		}
		

		return (
			<div>
				<Table
					dataSource={this.state.list}
					columns={columns}
					pagination={false}
				/>
				<div className="spin-box"> 
					<BottomLoad />
				</div>
			</div>
		)
	}

	index() {
		this.setState({ loading: true });
		api.qiniu.getQiniuList()
			.then(res => {
				if (res.data.code === 0) {
					let resData = res.data.data;
					this.setState({
						list: resData.items,
						marker: resData.marker
					});
				} else {
					message.error('获取七牛云 Token 失败！');
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
		
	}

};

export default Qiniu;