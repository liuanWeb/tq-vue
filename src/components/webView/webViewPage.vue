<template>
  <div class="webViewPage page">
    <mHead :title="title"></mHead>
    <div class="content">
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>

<script>
import mHead from '../common/mHead'
export default {
  name: 'webViewPage',
  components:{mHead},
  created(){
    this.title = this.$route.query.title;
    this.url   = this.$route.query.url;
  },
  data() {
    return {
      title: '',
      src: ''
    };
  },
  methods: {

  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  body::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
  }
</style>
