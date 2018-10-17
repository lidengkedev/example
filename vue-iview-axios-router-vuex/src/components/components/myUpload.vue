<template>
	<div id="myUpload">
		<input type="file" name="" 
		:value="currentValue" 
		@input="handleInput"
		@change="handleChange"
		/>
	</div>
</template>
<script>
	export default {
		name: 'myUpload',
		props: {
			value: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				currentValue: this.value
			}
		},
		methods: {
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