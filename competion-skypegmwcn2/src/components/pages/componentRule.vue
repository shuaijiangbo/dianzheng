<template>
    <div v-html="rules" class="rules-content">
    </div>
</template>

  <script>
  import {get, post} from '@/api/fetch.js';
  import url from '@/api/serviceAPI.config.js';
  import {mapState} from 'vuex'
  export default {
    name: "",
    data(){
      return{
        rules:''
      }
    },
    methods:{
      getDetail(matchId){
        get(url.eventdetail,{id:matchId}).then(res=>{
          let event =res.events;
          this.supportsList =res.supportsList;
          let {rules} =event;
          this.rules=rules;
        })
      },
    },
    created(){

    },
    mounted(){
      let matchId=this.$route.query.id;
      this.getDetail(this.eventId||JSON.parse(sessionStorage.getItem('events')).eventId);
    },
    computed:{
      ...mapState(['eventId',"eventName"])
    },
    filters:{
      cutTime:function(allTime){
        return allTime.split(' ')[0].replace(/-/g,'.');
      }
    },
  }
</script>

<style scoped>
.rules-content{
  padding:30px 75px;
}
</style>
