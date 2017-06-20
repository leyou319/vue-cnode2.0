<template>
	<div class="login-form-wrapper">
		<div class="login-form">
		    <h3 class="logo"><img src="../assets/images/logo.png" alt="logo"></h3>
		    <input type="tel" name="" id="" placeholder="请输入Token" class="txt" v-model="accesstoken">
		    <button class="btn js-btn-login" @click="signIn">登录</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: {
			accesstoken: {
				get () {
					return this.$store.state.user.accesstoken;
				},
				set (value) {
					this.$store.commit('UPDATEVAL', value);
				}
			}
		},
		methods: {
			...mapActions(['getUserInfo']),
			signIn () {
				if (!this.accesstoken) {
					alert('Token不能为空');					
				}else {
					var router = this.$router;
					this.getUserInfo(router);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../assets/sass/common.scss';
	.login-form-wrapper{
		z-index: 1;
		position: absolute;
		top: 36px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #333;
	}
	.login-form{
		z-index: 9;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 280px;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		h3{
			margin: 0;
			img{
				display: block;
				max-width: 100%;
				margin: 0 auto;
			}
		}
		.txt{
			display: block;
			width: 100%;
			height: 40px;
			padding: 10px;
			margin: 20px 0;
			color: #fff;
			background: #666;
			border: 0;
			@extend %borderBox;
		}
		.btn{
			display: block;
			width: 100%;
			height: 38px;
			line-height: 38px;
			text-align: center;
			font-size: 16px;
			color: #80bd01;
			border: 1px solid #80bd01;
			border-radius: 5px;
			background: transparent;
		}
	}
</style>