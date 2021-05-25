<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>   
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props:{
    path: String,
    activeColor:{
      type:String,
      default: 'rgb(255, 0, 119)'
    }
  },
  data(){
    return{
      //  isActive:true
    }
  },
  computed:{
    isActive(){
      // return this.$route.path.indexOf(this.path) !== -1
      return this.$route.path.includes(this.path)

    },
    activeStyle(){
      //活跃=>color:this.activeColor   不活跃=>null
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
      // console.log('click')
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size:14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
/* 
  .active{
    color: rgb(255, 0, 119);
  } */
</style>