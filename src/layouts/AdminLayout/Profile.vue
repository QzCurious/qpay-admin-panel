<template>
	<div class="layout-profile">
		<div>
			<img src="/assets/layout/images/profile.png" alt="" />
		</div>
		<span class="username">{{ signin_id }}</span>
	</div>
</template>

<script>
	import store from '../../store'
	export default {
		data() {
			return {
				signin_id: store.getters["auth/signin_id"],
				expanded: false
			}
		},
		methods: {
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			}
		}
	}
</script>

<style scoped>
.username {
	color: #fff
}
</style>