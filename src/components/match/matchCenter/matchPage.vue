<template>
  <div class="matchPage">
    <div class="header">
      <div class="mTabs">
        <div class="list">
          <router-link class="item" :to="{path:'/matchPage/matchCenter/footBallMatchPage'}">足球</router-link>
          <router-link class="item" :to="{path:'/matchPage/matchCenter/basketBallMatchPage'}">篮球</router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view class="content hasFooter" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'matchPage',
  created(){

  },
  data() {
    return {
    };
  },
  methods: {
    screen(){

    }
  }
}
</script>

<style>
</style>
