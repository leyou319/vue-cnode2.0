import * as types from '../types.js';
import api from '../../fetch/api.js';

const state = {
	topic: {
		author: {}
	},
	showModal: false,
	userReply: ''
}

const actions = {
	getTopic({ commit, rootState }, id) {
		var accesstoken = rootState.user.accesstoken;
		commit(types.COM_LOADING, true);
		api.getTopicById({id: id, accesstoken: accesstoken})
		.then(res => {
			commit(types.COM_LOADING, false);
			commit(types.GET_TOPIC, res.data);
		})
		.catch(err => {
			console.log(err);
		});
	},
	setKeep({ commit, rootState }, id) {
		var accesstoken = rootState.user.accesstoken;
		var flag = rootState.user.loginStatus;
		if (flag) {
			api.getCollect({id: id, accesstoken: accesstoken})
			.then(res => {
				commit(types.GET_COLLECT, true);
			})
			.catch(err => {
				console.log(err);
			});
		}else {
			commit(types.GET_MODAL, true);
		}
	},
	cancelKeep({ commit, rootState }, id) {
		var accesstoken = rootState.user.accesstoken;
		api.getDelCollect({id: id, accesstoken: accesstoken})
		.then(res => {
			commit(types.GET_COLLECT, false);
		})
		.catch(err => {
			console.log(err);
		});
	},
	getGood({ commit, rootState }, params) {
		var _user = rootState.user;
		var accesstoken = _user.accesstoken;
		var flag = _user.loginStatus;
		var userId = _user.userInfo.id;
		var id = params.id;
		var index = params.index;
		if (flag) {
			api.getUp({id: id, accesstoken: accesstoken})
			.then(res => {
				if(res.data.action == 'up'){
					commit(types.SET_GOOD, {
						id: userId,
						index: index,
						status: true
					});
				}else {
					commit(types.SET_GOOD, {
						id: userId,
						index: index,
						status: false
					});
				}						
			})
			.catch(err => {
				console.log(err);
			});
		}else {
			commit(types.GET_MODAL, true);
		}
	},
	setReply({ commit, rootState}, params) {
		var _user = rootState.user;
		var accesstoken = _user.accesstoken;
		var flag = _user.loginStatus;
		var head_url = _user.userInfo.avatar_url;
		var name = _user.userInfo.loginname;
		var id = params.id;
		var replyContent = params.content;
		if (flag) {
			if (replyContent !== ''){
				api.getReply({id: id, accesstoken: accesstoken, content: replyContent})
				.then(res => {
					let _id = res.data.reply_id;
					commit(types.SET_REPLY, {
						id: _id,
						avatar_url: head_url,
						loginname: name,
						content: replyContent
					});
					commit(types.UPDATE_REPLY, '');
				})
				.catch(err => {
					console.log(err);
				})
			}else {
				alert('评论内容不能为空！');
			}
		}else {
			commit(types.GET_MODAL, true);
		}
	}
}

const getters = {
	topic: state => state.topic,
	showModal: state => state.showModal,
	userReply: state => state.userReply
}

const mutations = {
	[types.GET_TOPIC] (state, res) {
		state.topic = res.data;
	},
	[types.GET_COLLECT] (state, status) {
		state.topic.is_collect = status;
	},
	[types.GET_MODAL] (state, status) {
		state.showModal = status;
	},
	[types.SET_GOOD] (state, params) {
		var flag = params.status,
			_id = params.id,
			_index = params.index;
		state.topic.replies[_index].is_uped = flag;
		if (flag) {			
			state.topic.replies[_index].ups.push(_id);
		}else {
			state.topic.replies[_index].ups.pop(_id);
		}		
	},
	[types.UPDATE_REPLY] (state, val) {
		state.userReply = val;
	},
	[types.SET_REPLY] (state, params) {
		var _id = params.id,
			userHead = params.avatar_url,
			userName = params.loginname,
			_content = params.content;
		var obj = {
			id: _id,
			author: {
				avatar_url: userHead,
				loginname: userName
			},
			create_at: new Date().getTime(),
			content: _content,
			ups: []
		};
		state.topic.replies.push(obj);
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}