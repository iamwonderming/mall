<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行' , '新款' , '精选']" @tabClick="tabClick" ref="tabControl"
                 class="tab-control1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行' , '新款' , '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>


     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps//RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import GoodsListItem from '../../components/content/goods/GoodsListItem'
import Scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from "../../network/home"
import { debounce } from "../../common/utils"
// import Swiper from '../../components/common/swiper/Swiper'
// import SwiperItem from '../../components/common/swiper/SwiperItem'


export default {
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },
  data(){
    return{
      recommends:[],
      banners:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed(){
    console.log("home has been destroyed")
  },
  activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
  },
  deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
  },
  created(){
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    // 图片加载完成事件监听
    const refresh = debounce(this.$refs.scroll.refresh,200)

    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

  },
  methods:{
    /**
     * 事件监听相关
     */


    /**
     * 防抖动函数debounce
     */
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      console.log('already has been backClick');
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // console.log(position)
      // 判断BackTop是否显示
      this.isShowBackTop = -(position.y) > 1000  
      // 决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore(){
      console.log('loadmore')
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关
     */
    getHomeMultidata(){
     getHomeMultidata().then(res => {
      // console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
      },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list) 
        this.goods[type].page += 1     


        this.$refs.scroll.finishPullUp()
      })
      }
 
  }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px;   */
    position: relative;
    height: 100vh;
    /* padding-bottom: 4000px; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0%;
    left: 0%;
    right: 0%;
    z-index: 9; */
  }
  /* .tab-control {
    position: sticky;
    top: 44px;
    background: #fff;
    z-index: 9;
  } */

  .tab-control {
    position: relative;
    z-index: 9;
  }
  
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>