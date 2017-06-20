import * as types from '../types.js';
import api from '../../fetch/api.js';

const state = {
	topics: [],
	searchKey: {
		tab: 'all',
		page: 0,
		limit: 10
	},
	scrollStatus: true
}

const actions = {
	getTopics({ commit }) {
		if (state.scrollStatus) {
			commit(types.GET_PAGE);			
			commit(types.COM_LOADING, true);
			commit(types.GET_SCROLL_STATUS, false);
			api.getTopics(`tab=${state.searchKey.tab}&page=${state.searchKey.page}&limit=${state.searchKey.limit}`)
			.then(res => {
				commit(types.COM_LOADING, false);
				commit(types.GET_SCROLL_STATUS, true);
				commit(types.GET_TOPICS, res.data);
			})
			.catch(err => {
				console.log(err);
			});
		}
	}
}

const getters = {
	topics: state => state.topics
}

const mutations = {
	[types.GET_TOPICS] (state, res) {
		if (state.searchKey.page <= 1) {
			state.topics = res.data;
		}else {
			state.topics = state.topics.concat(res.data);
		}
	},
	[types.GET_SEARCH_KEY] (state, params) {
		state.searchKey = params;
	},
	[types.GET_PAGE] (state) {
		state.searchKey.page += 1;
	},
	[types.GET_SCROLL_STATUS] (state, status) {
		state.scrollStatus = status;
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}