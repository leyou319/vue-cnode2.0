import Vue from 'vue';
import Vuex from 'vuex';

import com from './modules/com.js';
import topics from './modules/topics.js';
import detail from './modules/detail.js';
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		com,
		topics,
		detail,
		user
	},
	strict: process.env.NODE_ENV !== 'production'
})