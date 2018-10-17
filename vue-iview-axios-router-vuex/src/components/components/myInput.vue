<template>
	<div id="selectList">
		<input type="text" name="" 
		:value="currentValue" 
		:placeholder="placeholder"
		@keyup.enter="handleEnter"
		@change="handleChange"
		@input="handleInput"
		/>
	</div>
</template>
<script>
	export default {
		name: 'selectList',
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String],
				default: ''
			}
		},
		data () {
			return {
				currentValue: this.value
			}
		},
		methods: {
			handleEnter (event) {
				this.$emit('on-enter', event);
				if (this.search) this.$emit('on-search', this.currentValue);
			},
			handleInput (event) {
				let value = event.target.value;
                this.$emit('input', value);
			},
			handleChange (event) {
				let value = event.target.value;
				this.$emit('on-change', value);
			}
		}
	}
</script>
<style scoped>
	
</style>