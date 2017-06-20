<template>
	<div id="app">
		<header-section :showBack="showBack"></header-section>
		<transition name="fade" mode="out-in">			
			<keep-alive>
				<router-view></router-view>			
			</keep-alive>
		</transition>	
	</div>
</template>

<script>
	import headerSection from './components/header.vue';

	export default {
		name: 'app',
		data () {
			return {
				showBack: false
			}
		},
		created () {
			this.setBack();
		},
		watch: {
			$route () {
				this.setBack();
			}
		},
		components: {
			headerSection
		},
		methods: {
			setBack () {
				if (this.$route.name !== 'home') {
					this.showBack = true;
				}else {
					this.showBack = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './assets/sass/reset.scss';
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s ease;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}	
</style>