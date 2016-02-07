<template>
    <div class="vote-view">
        <div class="content">
            <div class="row">
                <template v-for="item in list">
                    <div class="cell">
                        <div v-if="item.type !== ''" class="outer" :class="{'checked': item.checked, 'unchecked': !item.checked}">
                            <div class="inner" @click="check(item)"><b>{{{item.name}}}</b></div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="buttons">
            <div class="button" @click="clear">重置</div>
            <div class="button" @click="vote">投票</div>
        </div>
        <div class="test" @click="test"></div>
    </div>
</template>
<style lang="sass">
    .vote-view {
        min-height: 100%;
        background-image: url('../images/vote-bg.png');
        .content {
            position: relative;
            .row {
                padding: 20px 10px 10px 50px;
                width: 100%;
                .cell {
                    margin-top: 20px;
                    width: 200px;
                    margin-right: 20px;
                    height: 200px;
                    font-size: 30px;
                    color: #d20f1f;
                    display: inline-block;
                    .outer {
                        border-radius: 100px;
                        display: table;
                        height: 100%;
                        width: 100%;
                        text-align: center;
                        .inner {
                            width: 100%;
                            display: table-cell;
                            vertical-align: middle;
                        }
                    }
                    .checked {
                        border: 2px #ff8b01 solid;
                        background-color: rgba(250, 193, 94, .6);
                    }
                    .unchecked {
                        border: 2px #d20f1f solid;
                        background-color: rgba(253, 234, 192, .7);
                    }
                }
            }
        }
        .buttons {
            width: 100%;
            padding: 20px 30px;
            display: -webkit-box;
            .button {
                margin-left: 55px;
                margin-right: 20px;
                background-color: rgba(210, 15, 31, 1);
                width: 250px;
                height: 100px;
                border-radius: 20px;
                color: white;
                font-size: 40px;
                text-align: center;
                line-height: 100px;
            }
        }
        .test {
            margin-top: 20px;
            width: 5%;
            height: 100px;
        }
    }
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        background-color: rgba(210, 15, 31, .7);
        border-radius: 5px;
        color: white;
        transform: translate(-50%, -50%);
        font-size: 30px;
        padding: 20px;
    }
</style>
<script>
import list from '../list'
export default{
    data(){
        return {
            list: list.list,
            total: 0,
            api: /^fortune/.test(location.href)?'http://fortune.meiyuxiuxiu.net:8008':'http://192.168.199.168:8008'
        }
    },
    created() {
        this.clear();
    },
    methods: {
        vote() {
            if (this.total < 3) {
                this.toast('请选择3个节目后再提交');
                return;
            }
            var test = 'voted=', voted = 0;
            var testable = 'voteable=', voteable = 0;
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(test) != -1) {
                    voted = c.substring(test.length, c.length);
                }
                if (c.indexOf(testable) != -1) {
                    voteable = c.substring(testable.length, c.length);
                }
            }
            if (voted == '1') {
                this.toast('你已经投过票了');
                return;
            }
            if(voteable === 0){
                this.toast('请确认你是否投过票了');
                return;
            }
            this.$http.get(this.api + '/get').then(({data}) => {
                if(data.status){
                    var results = 0;
                    for (var index in this.list) {
                        if (this.list[index].checked) {
                            results *= 12;
                            results += parseInt(index);
                        }
                    }
                    this.$http.get(this.api + '/add?name=' + results).then(() => {
                        document.cookie = 'voted=1';
                        this.toast('投票成功');
                    });
                } else {
                    this.toast('没到投票时间');
                }
            });
        },
        clear() {
            for (let index in this.list) {
                this.list[index].checked = false;
            }
            this.total = 0;
        },
        check(item) {
            if (item.type === '') {
                return;
            }
            if (!item.checked) {
                if (this.total < 3) {
                    item.checked = true;
                    this.total += 1;
                } else {
                    this.toast('最多只能选3个');
                }
            } else {
                item.checked = false;
                this.total -= 1;
            }

        },
        toast(msg, delay = 1000) {
            const span = document.createElement('span');
            span.innerText = msg;
            span.className = 'toast';
            document.body.appendChild(span);
            setTimeout(() => span.parentNode.removeChild(span), delay);
        },
        test() {
            document.cookie = 'voted=0';
        }
    }
}
</script>
