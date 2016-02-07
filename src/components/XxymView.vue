<template>
    <div class="xxym-view">

    </div>
</template>
<style lang="sass">
    .xxym-view {
    }
</style>
<script>
export default{
    data(){
    },
    created() {
        document.cookie = 'voteable=1';
        this.$route.router.replace({'name': 'vote'});
    }
}
</script>
