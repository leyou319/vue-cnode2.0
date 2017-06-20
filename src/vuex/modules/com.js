import * as types from '../types.js';

const state = {
	initIndex: 0,
	tabItem: [
		{ title: '全部', type: 'all'},
		{ title: '精华', type: 'good'},
		{ title: '分享', type: 'share'},
		{ title: '问答', type: 'ask'},
		{ title: '招聘', type: 'job'}
	],
	loading: false,
	noData: false
}

const actions = {

}

const getters = {
	initIndex: state => state.initIndex,
	tabItem: state => state.tabItem,
	loading: state => state.loading,
	noData: state => state.noData
}

const mutations = {
	[types.COM_INIT_INDEX] (state, index) {
		state.initIndex = index;
	},
	[types.COM_LOADING] (state, status) {
		state.loading = status;
	},
	[types.COM_NODATA] (state, status) {
		state.noData = status;
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}