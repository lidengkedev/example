<template>
	<!--<div id="test">{{ text }}</div>-->
	<div id="app">
		<div id="cover"></div>
		<Header></Header>
		<Todo></Todo>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from './todo/header.vue'
	import Footer from './todo/footer.jsx'
	import Todo from './todo/todo.vue'
	
	export default {
		data() {
			return {
				text: 'a3434c'
			}
		},
		components: {
			Header,
			Footer,
			Todo
		}
	}
</script>

<style lang="stylus" scoped="">
	/*#test {
		color: red;
	}*/
	#app {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	#cover {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: #999999;
		opacity: 0.9;
		z-index: -1;
	}
</style>