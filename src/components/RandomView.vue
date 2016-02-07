<style lang="sass">
.lottery-view {
    /*grid*/
    .grid {
        display: flex;
        flex-wrap: wrap;
        height: 100vh;
        /*background-color: #980315;*/
    }
    .grid > div {
        height: 10%;
        width: 10%;
        text-align: center;
        line-height: calc(10vh - 6px);
        font-size: 1.2em;
        color: white;
    }
    .grid > div > div {
        background-color: rgba(200, 200, 200, .5);
        /*background-color: #efeff4;*/
        margin: 3px;
        border-radius: 5px;
        transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        /*transition: all 0.35s ease-in-out;*/
        transform: scale(0);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .grid > div > div.winner {
        background-color: gold;
        color: white !important;
        font-size: .8em;
    }
    .grid > div > div.winner::before {
        content: '👻';
    }
    .grid > div > div.winner:hover {
        cursor: alias;
        &::before {
             content: '';
         }
    }
    .grid.ready > div > div {
        transform: scale(1);
    }
    .result {
        position: absolute;
        transition: all .5s ease;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        opacity: 0;
    }
    .highlight {
        background-color: rgba(255, 63, 79, 0.7);
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 2em;
        color: white;
        opacity: 1;
        text-align: center;
        padding-top: calc(50vh - 5em);
    }
    .highlight h3 {
        font-size: 2em;
    }
    /*neon light animation*/
    @-webkit-keyframes light-on {
        0%      {background-color: #efeff4; box-shadow: 0 0 0 gold; color: white;}
        50%     {background-color: gold; box-shadow: 0 0 15px gold; color: white;}
        100%    {background-color: gold; box-shadow: 0 0 30px gold; color: white;}
    }
    .on {
        animation-name: light-on;
    }
}
</style>
<template>
    <div class="lottery-view">
        <div class="grid" :class="{'ready': ready}">
            <div v-for="user in users">
                <div @click="toggle(user.n)" style="font-size:20px;" :class="{'on': active.index === $index, 'winner': winners.indexOf(user.n) !== -1}" :style="{color: user.color, transitionDelay: user.delay, animationDuration: active.duration+'ms'}">
                    {{user.n || ''}}
                </div>
            </div>
        </div>
        <div :class="{'highlight': winner}" class="result" style="font-size:20px;">
            <h3>{{winner}}</h3>
            <div>【全程由Math.random公正】</div>
        </div>
    </div>
</template>
<script>
import names from '../names'
import randomColor from '../randomColor'
export default{
    data() {
        return {
            ready: false,
                store: names.store,
                users: [],
                active: {
                    index: -1,
                    n: '',
                    duration: 50
                },
                winners: [],
                winner: ''
        }
    },
    events: {
        'keyup': function () {
            console.log('keyup!')
        }
    },
    created() {
        // winners
        var self = this;
        let users = names.users;
        var winners = names.store.getItem('winners');
        if(winners) {
            this.winners = winners.split(',');
        }
        this.$watch('winners', function(winners) {
            this.store.setItem('winners', winners.join(','));
        });
        // users
        users.forEach(function(user) {
            user.color = randomColor({
                luminosity: 'dark'
            });
            user.delay = Math.ceil(Math.random() * 2000) + 'ms';
        });
        while(users.length < 100 ) {
            users.push({});
        }
        users.sort(function() {
            return 0.5 - Math.random();
        });
        this.users = users;
        setTimeout(function() {
            self.ready = true;
        }, 300);
        $(document).on('animationend', '.grid > div > div.on', function() {
            self.start();
        });
        $(document).on('keyup', function(e) {
            if(e.keyCode === 13 || e.keyCode === 32) {
                self.start(true);
            }
        });
    },
    methods: {
        start(first) {
            if(this.winner) {
                return this.winner = '';
            } else if(this.active.duration !== 50 && first) {
                this.active.duration = 495;
                return console.debug('不要猴急');
            }
            if(this.active.duration > 500) {
                this.winners.push(this.active.n);
                this.winner = this.active.n;
                this.active.duration = 50;
            } else {
                var rIndex = Math.floor(Math.random() * 100);
                var rUser = this.users[rIndex];
                if(rIndex !== this.active.index
                        && rUser.n
                        && this.winners.indexOf(rUser.n) === -1
                        && (this.active.duration < 400 || rUser.x)) {
                    this.active.duration += 3;
                    this.active.index = rIndex;
                    this.active.n = rUser.n;
                } else {
                    this.start();
                }
            }
        },
        toggle(name) {
            var i = this.winners.indexOf(name);
            if(i !== -1) {
                this.winners.splice(i, 1);
            } else {
                this.winners.push(name);
            }
        }
    }
}
</script>