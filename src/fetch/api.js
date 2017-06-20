import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
axios.defaults.transformRequest[0] = function(data) {
	data = qs.stringify(data);
	return data;
}

export default {
	//获取文章列表
	getTopics (params) {
		return axios.get(`/topics?${params}`);
	},
	//获取文章详情
	getTopicById (params = {id: '', accesstoken: ''}) {
		return axios.get(`/topic/${params.id}?accesstoken=${params.accesstoken}`);
	},
	//登录
	getLogin (params = {accesstoken: ''}) {
		return axios.post('/accesstoken', {accesstoken: params.accesstoken});
	},
	//收藏
	getCollect (params = {id: '', accesstoken: ''}) {
		return axios.post(`/topic_collect/collect`, {accesstoken: params.accesstoken, topic_id: params.id});
	},
	//取消收藏
	getDelCollect (params = {id: '', accesstoken: ''}) {
		return axios.post(`/topic_collect/de_collect`, {accesstoken: params.accesstoken, topic_id: params.id});
	},
	//点赞
	getUp (params = {id: '', accesstoken: ''}) {
		return axios.post(`/reply/${params.id}/ups`, {accesstoken: params.accesstoken});
	},
	//回复评论
	getReply (params = {id: '', accesstoken: '', content: ''}) {
		return axios.post(`/topic/${params.id}/replies`, {accesstoken: params.accesstoken, content: params.content});
	},
	//用户详情
	getUser (name) {
		return axios.get(`/user/${name}`);
	}
}