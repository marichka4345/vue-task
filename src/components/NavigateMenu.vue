<template>
	<div class="navigate-menu">
		<router-link to="/notes/archieved">
			Archieved Notes
		</router-link>
	</div>
</template>

<script>
  export default {
  	name: 'NavigateMenu'
  }
</script>

<style scoped>
	.navigate-menu {
		width: 100%;
		position: absolute;
		bottom: 0;
		font-weight: bold;
	}
</style>
