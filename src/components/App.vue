<style lang="sass">
    /*reset*/
    * {
        margin: 0;
        padding: 0;
    }

    *, *:before, *:after {
        box-sizing: inherit;
        color: inherit;
    }
    :root {
        box-sizing: border-box;
    }
</style>
<template>
    <main class="loading">
        <router-view></router-view>
    </main>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                message: 'false'
            }
        },
        created() {
            var resizing = null;
            function adjustBase() {
                var clientWidth = document.body.clientWidth;
                document.querySelector('html').style['font-size'] = (clientWidth / 10) + 'px';
                resizing = null;
            }
            adjustBase();
            window.onresize = function() {
                if (resizing) {
                    clearTimeout(resizing);
                }
                resizing = setTimeout(adjustBase, 50);
            };
        }
    }
</script>
