<template>
	<div id="" :class="['todo-item', todo.completed ? 'completed' : '']">
		<input 
			type="checkbox" 
			class="toggle"
			v-model="todo.completed"
		/>
		<label>{{todo.content}}</label>
		<button class="destory" @click="deleteTodo"></button>
	</div>
</template>

<script>
	export default {
		props: {
			todo: {
				type: Object,
				required: true
			}
		},
		methods: {
			deleteTodo(e) {
				this.$emit('del',this.todo.id)
			}
		}
	}
</script>

<style lang="stylus" scoped="scoped">
	.todo-item {
		position relative
		background-color #FFFFFF
		font-size 24px
		width 600px
		overflow hidden
		border-bottom 1px solid rgba(0,0,0,0.6)
		&:hover {
			.destory:after {
				content 'x'
			}
		}
		label {
			white-space pre-line
			word-break break-all
			padding 15px 60px 15px 15px
			margin-left 45px
			display block
			line-height 1.2
			transition color .4s
		}
		&.completed {
			label {
				color #D9D9D9
			}
		}
	}
	.toggle {
		text-align center
		width 40px
		height 40px
		position absolute
		top 10px
		left 10px
		margin auto 0
		border none
		-webkit-appearance none
		outline none
		&:after {
			content url(../assets/images/notchecked.png)
		}
		&:checked+label{
			text-decoration line-through
		}
		&:checked:after {
			content url(../assets/images/checked.png)
		}
	}
	.destory {
		position absolute
		outline none
		background-color #FFFFFF
		border none
		top 10px
		right 0
		width 40px
		height 40px
		margin auto 0
		font-size 30px
		color #cc9a9a
		margin-bottom 11px
		transition color .2s ease-out
	}
</style>