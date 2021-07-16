<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }    
  },
  data(){
    return{
      scroll: null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click:true,
      mouseWheel:true,
      observeDOM:true,
      observeImage:true,
    })
    //监听滚动
    if ( this.probeType === 2 || this.probeType === 3 ){
      this.scroll.on('scroll', (position) => {
      // console.log(position);
      // 监听滚动位置
      this.$emit('scroll', position)
    })
    }

    //监听上拉
    if ( this.pullUpLoad ){    
      this.scroll.on('pullingUp',() => {
      console.log('监听到上拉')
      this.$emit('pullingUp')
    })}

    // console.log(this.scroll)
    this.scroll.refresh()
  },
  updated(){
  },
  methods:{
    scrollTo(x,y, time){
      this.scroll && this.scroll.scrollTo(x,y, time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    // refresh(){
    //   console.log('refresh执行/次')
    //   this.scroll && this.scroll.refresh()
    // },
    refresh() {
    this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
}
</script>

<style>

</style>