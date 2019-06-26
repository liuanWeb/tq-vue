<template>
  <div class="newsList">
    <div class="item" v-for="(item,index) in data" :key="index" :class="{right:item.msg_urls && item.msg_urls.split(',').length == 2 && !item.cover_url}">
      <p class="title">{{item.title}}</p>
      <div class="imgBox" v-if="item.cover_url">
        <img :src="item.cover_url" alt="">
      </div>
      <div class="imgList row" v-if="item.msg_urls && item.msg_urls.split(',').length >= 3 && !item.cover_url">
        <div class="imgBox col" v-for="(item2,index2) in item.extendObj.msg_urls.split(',')" :key="index2">
          <img :src="item2" :alt="item.extendObj.title">
        </div>
      </div>
      <div class="imgBox imgRight" v-if="item.msg_urls && item.msg_urls.split(',').length == 2 && !item.cover_url">
        <img :src="item.extendObj.msg_urls.split(',')[0]" >
      </div>
      <div class="infoBox">
        <div class="authorBox">
          <div class="imgBox authorImg">
            <img :src="item.extendObj.publisher_url" :alt="item.extendObj.publisher">
          </div>
          <span class="name">{{item.extendObj.publisher}}</span>
        </div>
        <span class="time">{{item.extendObj.create_time_db}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsList',
  props:['data'],
  created(){

  },
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  $redColor:        #e06464;
  .newsList{
    .item{
      padding:.2rem .4rem;
      border-bottom: #eaeaea solid 1px;
      .title{
        color: #333;
        font-size: .32rem;
        line-height: .5rem;
        max-height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .imgList{
        margin: .15rem 0;
        .imgBox{
          &:nth-child(2){
            margin: 0 .05rem;
          }
        }
      }
      .infoBox{
        overflow: hidden;
        color: #999;
        line-height: .48rem;
        .authorBox{
          float: left;
          .authorImg{
            width: .48rem;
            height: .48rem;
            float: left;
            img{
              border-radius: 50%;
            }
          }
          .name{
            margin-left: .15rem;
          }
        }
        .time{
          float: right;
        }
      }
      &.right{
        padding-right: 2.88rem;
        position: relative;
        .imgRight{
          position: absolute;
          right: .4rem;
          top: .4rem;
          height: 1.68rem;
          width: 2.3rem;
        }
      }
    }

  }
</style>
