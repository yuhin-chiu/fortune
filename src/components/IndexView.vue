<template>
    <div class="index-view bg-default padding">
        <ul>
            <li class="tab">目录</li>
            <li class="font-26 border-top padding center">
                <a href="/#/tpjg">投票结果</a>
            </li>
            <li class="font-26 border-top padding center">
                <a href="/#/random">抽奖页面</a>
            </li>
            <li class="font-26 border-top padding center">
                <a href="/#/xxym">投票页面</a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'Index',
        data() {
            return {
                host: location.href
            };
        },
        created() {
        }
    }
</script>

<style lang='sass'>
.index-view {
    color: #2196F3;
    li {
        padding: 20px 0;
        &.tab {
            font-size: 40px;
            color: tomato;
        }
    }
    .font-26 {
        font-size: 26px;
    }
}
</style>
