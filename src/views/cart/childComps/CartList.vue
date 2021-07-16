<template>
  <scroll class="content" ref="scroll">
    <div>
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </div>
  </scroll>
  
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll'
  import CartListItem from './CartListItem.vue'

  import { mapGetters } from 'vuex'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    // computed:{
    //   ...mapGetters(['cartList'])
    // },
    activated(){
      this.$refs.scroll.refresh()
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    }
	}
</script>

<style scoped>

</style>
