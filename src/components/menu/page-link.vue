<template>
    <ul class="page-inner">
        <li v-for="(item, index) in data" :key="index" class="page-item">
            <a :href="item.src" class="page-link">{{ item.title }}</a>
        </li>
    </ul>
</template>

<script setup>
defineProps({
    data: Array
})
</script>

<style scoped>

</style>
