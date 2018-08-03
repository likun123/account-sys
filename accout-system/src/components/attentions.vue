<template>
    <ul>
        <li><span>1</span><router-link :to="{name:'articles',params:{ id : 1}}">文章标题</router-link></li>
        <li><span>1</span>标题内容</li>
    </ul>
</template>
<script>
export default {
    name:"attentions",
    data(){
        return{

        }
    }
}
</script>

<style scoped>

</style>
