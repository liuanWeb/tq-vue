<template>
  <div class="header">
    <div class="goBack btn lf1">
      <a @click="goBack(url,query)" class="btnGoBack"></a>
    </div>
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
import goBack from '../common/goBack'
export default {
  name: 'mHead',
  props:['title','url','query'],
  components:{goBack},
  created(){

  },
  data() {
    return {

    };
  },
  methods: {
    goBack(url,query){
      this.$store.commit("setTransition", "turn-off");
      if(url){
        this.$router.push({path:url,query:query});
      }else{

        this.$router.back(-1);
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>

</style>
