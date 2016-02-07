<template>
  <div class="results-view">
    <img src="../images/result-bg.png" class="bg">
    <div class="bgd">
      <div class="content">
        <div class="lists">
          <template v-for="item in 6">
            <div class="row">
              <div class="left" id="result{{$index<5?$index*2:$index*2+1}}"></div>
              <div class="" id="result{{$index<5?$index*2+1:$index*2}}"></div>
            </div>
          </template>
        </div>
      </div>
      <div class="titles">
          <template v-for="item in 6">
              <div class="title">
                  <div class="left" id="title{{$index<5?$index*2:$index*2+1}}"></div>
                  <div class="right" id="title{{$index<5?$index*2+1:$index*2}}"></div>
              </div>
          </template>
      </div>
      <div @click="begin" class="button" :class="{'bg-red': status}"></div>
      <div style="display: none;">
        <img src="../images/1.svg">
        <img src="../images/2.svg">
        <img src="../images/3.svg">
        <img src="../images/4.svg">
        <img src="../images/5.svg">
      </div>
    </div>
  </div>
</template>
<script>
  import list from '../list'
  export default {
    data() {
        return {
            results: [],
            list: list.list,
            status: false,
            api: /^fortune/.test(location.href) ? 'http://fortune.meiyuxiuxiu.net:8008' : 'http://192.168.199.168:8008'
        }
    },
    created() {
        this.$watch('results', (data) => {
            for (let i = 0; i < data.length; i++) {
                var str = '';
                if (data[i] === null || data[i] === undefined) {
                    document.getElementById('result' + i).innerHTML = str;
                    continue;
                }
                var num = data[i].total;
                while (num > 5) {
                    str += '<img src="fonts/5.svg">';
                    num -= 5;
                }
                if (num !== 0) {
                    str += '<img src="fonts/' + num + '.svg">';
                }
                if (data[i].total > 90) {
                    str = '<strong>' + data[i].total + '</strong>';
                }
                document.getElementById('result' + i).innerHTML = str;
            }
        });
    },
    route: {
        data() {
            setInterval(() => {
                this.fetch();
            }, 500);
        }
    },
    methods: {
        fetch() {
            if (this.status) {
                this.$http.get(this.api + '/read')
                    .then(({data}) => {
                        this.results = data;
                });
            }
        },
        begin() {
            if (this.status) {
                this.$http.get(this.api + '/set?status=false').then(() => {
                    this.end();
                });
            } else {
                this.$http.get(this.api + '/set?status=true').then(() => {
                    for (let i = 0; i < 6; i++) {
                        document.getElementById('title' + i*2).className = 'left untarget';
                        document.getElementById('title' + (i*2+1)).className = 'left untarget';
                    }
                });
            }
            this.status = !this.status;
        },
        end() {
            var arr = [],
                    max = 0,
                    n = 0;
            for (let i = 0; i < this.results.length; i++) {
                if (this.results[i] === null || this.results[i] == undefined) {
                    continue;
                }
                if (this.results[i].total > max) {
                    max = this.results[i].total;
                    arr[n] = i;
                }
            }
            for (let i = arr[n] + 1; i < this.results.length; i++) {
                if (this.results[i] === null || this.results[i] == undefined) {
                    continue;
                }
                if (this.results[i].total == max) {
                    arr[++n] = i;
                }
            }
            for (let i = 0; i < arr.length; i++) {
                document.getElementById('result' + arr[i]).innerHTML = '<strong>' + this.results[arr[i]].total + '</strong>';
                document.getElementById('title' + arr[i]).className = 'target';
            }
        }
    }
}
</script>
<style lang="sass">
.results-view {
    height: 100%;
    width: 100%;
    img.bg {
        margin-top: 5vh;
        min-height: 80%;
        min-width: 100%;
        width: 100%;
        height: 80%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
    }
    .bgd {
        min-height: 100%;
        min-width: 100%;
        z-index: 100;
        position: fixed relative;
        .content {
            width: 630px;
            height: 52vh;
            font-size: 17px;
            color: white;
            position: relative;
            top: 25vh;
            left: 125px;
            line-height: 29px;
            .lists {
                position: relative;
                display: table;
                width: 100%;
                height: 100%;
                img {
                    width: 15px;
                    height: 15px;
                    vertical-align: middle;
                }
                .row {
                    display: table-row;
                    width: 100%;
                    height: 16.66%;
                    > div {
                        text-align: left;
                        display: table-cell;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                    }
                    .left {
                        width: 320px;
                    }
                }
            }
        }
        .button {
            position: relative;
            top: 21.7vh;
            left: 14px;
            width: 51px;
            height: 6vh;
            font-size: 23px;
            overflow: hidden;
            color: white;
        }
    }
    .titles {
        position: fixed;
        width: 630px;
        height: 52vh;
        font-size: 17px;
        color: white;
        top: 23vh;
        left: 75px;
        line-height: 29px;
        display: table;
        .title {
            display: table-row;
            width: 100%;
            height: 16.66%;
            > div {
                text-align: left;
                display: table-cell;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: middle;
            }
            .left {
                width: 320px;
            }
        }
    }
    .bg-red {
        background-color: #7B4241;
    }
    .target {
        border: 1px solid white;
        border-radius: 10px;
    }
    .untarget {
        border-width: 0;
    }
}
</style>
