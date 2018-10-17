<template>
    <div id="customList">
        <ul class="list">
            <li v-for="item of list" @click="selectValueHandle(item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'customList',
        props:["list"],
        data () {
            return {}
        },
        methods: {
            //在子组件中有交互。当点击时告知父级，改变val的值，需要触发一个自定义事件
            selectValueHandle:function(item){
                this.$emit("receive",item);
            }
        }
    }
</script>

<style scoped>

</style>