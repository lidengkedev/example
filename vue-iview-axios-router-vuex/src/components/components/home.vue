<template>
	<div id="home">
		输入框
		<MyInput 
			v-model="value" 
			:placeholder="'123'"
			@on-enter="inputEnter(value)" 
			@on-change="inputChange"
		></MyInput>
		{{ value }}
		<MyUpload v-model="file" @on-change="uploadFile"></MyUpload>
		{{ file }}

		<div style="float: left">
			<h2>自定义下拉框</h2>
			<custom-select btn-value="查询" v-bind:list="list1"></custom-select><!--若想使用自定义组件，则需要下面先进行注册组件//子组件-->
		</div>
		<div style="float: left">
			<h2>自定义下拉框2</h2>
			<custom-select btn-value="搜索" v-bind:list="list2"></custom-select>
			<!-- //这里可以使用驼峰命名方式也可以使用-形式-->
		</div>


	</div>
</template>
<script>
	import SystemHeader from '../commons/systemHeader'
	import MyInput from './myInput'
	import MyUpload from './myUpload'
	import CustomSelect from './customSelect'
	import CustomList from './customList'

	export default {
		name: 'home',
		data () {
			return {
				value: '',
				file: '',
				list1:["上海","北京","杭州"],
				list2:["17-2-21","17-3-12","17-4-16"]
			}
		},
		components: {
			MyInput,
			MyUpload,
			CustomSelect,
			CustomList,
		},
		methods: {
			inputEnter (event) {
				console.log(event);
				alert(event);
			},
			uploadFile () {
				var _this = this;
				
				console.log(_this.file)
			},
			inputChange (value) {
				alert(value);
			},
		}
	}
</script>