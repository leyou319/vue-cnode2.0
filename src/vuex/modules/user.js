import api from '../../fetch/api.js';
import * as types from '../types.js';

const state = {
	loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
	userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
	userData: [],
	accesstoken: localStorage.getItem('accesstoken') || ''
}

const actions = {
	getUserInfo({ commit }, router) {
		commit(types.COM_LOADING, true);
		api.getLogin({accesstoken: state.accesstoken})
		.then(res => {
			localStorage.setItem('userInfo', JSON.stringify(res.data));
			localStorage.setItem('loginStatus', true);
			localStorage.setItem('accesstoken', state.accesstoken);
			commit(types.COM_LOADING, false);
			commit(types.GET_USER_INFO, res.data);
			commit(types.SET_LOGIN_STATUS, true);
			router.replace('/');
		})
		.catch(err => {
			console.log(err);
		})
	},
	getUserData({ commit }, name) {
		commit(types.COM_LOADING, true);		
		api.getUser(name)
		.then(res => {
			commit(types.GET_USER_DATA, res.data.data);
			commit(types.COM_LOADING, false);
		})
		.catch(err => {
			console.log(err);
		})
	}
}

const getters = {
	userData: state => state.userData,
	loginStatus: state => state.loginStatus,
	userInfo: state => state.userInfo,
	accesstoken: state => state.accesstoken
}

const mutations = {
	[types.SET_LOGIN_STATUS](state, status) {
		state.loginStatus = status;
	},
	[types.GET_USER_DATA](state, res) {
		state.userData = res;
	},
	[types.GET_USER_INFO](state, res) {
		state.userInfo = res;
	},
	[types.UPDATEVAL](state, value) {
		state.accesstoken = value;
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}