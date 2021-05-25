<template>
  <!-- <h2>首页</h2> -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行' , '新款' , '精选']"></tab-control>
    <ul>
      <li>example1</li>
      <li>example2</li>
      <li>example3</li>
      <li>example4</li>
      <li>example5</li>
      <li>example6</li>
      <li>example7</li>
      <li>example8</li>
      <li>example9</li>
      <li>example10</li>
      <li>example11</li>
      <li>example12</li>
      <li>example13</li>
      <li>example14</li>
      <li>example15</li>
      <li>example16</li>
      <li>example17</li>
      <li>example18</li>
      <li>example19</li>
      <li>example20</li>
      <li>example21</li>
      <li>example22</li>
      <li>example23</li>
      <li>example24</li>
      <li>example25</li>
      <li>example26</li>
      <li>example27</li>
      <li>example28</li>
      <li>example29</li>
      <li>example30</li>
      <li>example31</li>
      <li>example32</li>
      <li>example33</li>
      <li>example34</li>
      <li>example35</li>
      <li>example36</li>
      <li>example37</li>
      <li>example38</li>
      <li>example39</li>
      <li>example40</li>
      <li>example41</li>
      <li>example42</li>
      <li>example43</li>
      <li>example44</li>
      <li>example45</li>
      <li>example46</li>
      <li>example47</li>
      <li>example48</li>
      <li>example49</li>
      <li>example50</li>
      <li>example51</li>
      <li>example52</li>
      <li>example53</li>
      <li>example54</li>
      <li>example55</li>
      <li>example56</li>
      <li>example57</li>
      <li>example58</li>
      <li>example59</li>
      <li>example60</li>
      <li>example61</li>
      <li>example62</li>
      <li>example63</li>
      <li>example64</li>
      <li>example65</li>
      <li>example66</li>
      <li>example67</li>
      <li>example68</li>
      <li>example69</li>
      <li>example70</li>
      <li>example71</li>
      <li>example72</li>
      <li>example73</li>
      <li>example74</li>
      <li>example75</li>
      <li>example76</li>
      <li>example77</li>
      <li>example78</li>
      <li>example79</li>
      <li>example80</li>
      <li>example81</li>
      <li>example82</li>
      <li>example83</li>
      <li>example84</li>
      <li>example85</li>
      <li>example86</li>
      <li>example87</li>
      <li>example88</li>
      <li>example89</li>
      <li>example90</li>
      <li>example91</li>
      <li>example92</li>
      <li>example93</li>
      <li>example94</li>
      <li>example95</li>
      <li>example96</li>
      <li>example97</li>
      <li>example98</li>
      <li>example99</li>
      <li>example100</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps//RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from '../../components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl'

import {getHomeMultidata} from "../../network/home"
// import Swiper from '../../components/common/swiper/Swiper'
// import SwiperItem from '../../components/common/swiper/SwiperItem'

export default {
  name:"Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data(){
    return{
      recommends:[],
      banners:[],
    }
  },
  created(){
    getHomeMultidata().then(res => {
      // console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
  #home{
    padding-top: 44px;  
    /* padding-bottom: 4000px; */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0%;
    left: 0%;
    right: 0%;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    background: #fff;
  }
</style>