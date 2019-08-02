<template>
   <div>
       <Header activeIndex="1"></Header>
   </div>
</template>
<script>
import Base from '@/base/base.vue'
import Header from '@/components/common/header/header'
export default Base.extend({
    components:{
        Header
    },
    mounted() {
        console.log(this.isA);
    },
})
</script>
<style lang="less">
    
</style>