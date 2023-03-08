<!--<template>-->
<!--<div>-->
<!--  <div class="flex items-center justify-between">-->
<!--    <div @click.stop="back">-->
<!--      <the-icon src="arrow-left" class="cursor-pointer"/>-->
<!--    </div>-->
<!--    <h3 class="text-gray-800 text-xl font-bold">{{ $t('basket') }} №{{ ' ' + $route.query?.carNumber }}</h3>-->
<!--    <button @click.stop="deleteOrder(getCartItems?.id)">-->
<!--      <the-icon class="cursor-pointer" src="trash-gray"/>-->
<!--    </button>-->
<!--  </div>-->
<!--  <div class="flex items-center justify-between mt-3">-->
<!--    <h4 class="font-medium text-sm text-gray-800">-->
<!--      &lt;!&ndash;          {{getCartItem}}&ndash;&gt;-->
<!--      {{ $t('your-order-vendor') }}-->
<!--      <br>-->

<!--      <span v-if="getCartItems && getCartItems.full_name" class="text-orange-600">{{getCartItems.full_name}}</span>-->
<!--      <span v-else class="text-orange-600">{{$t('not-vendor_name')}}</span>-->
<!--    </h4>-->
<!--    <div class="w-14 h-14 flex-shrink flex rounded-full overflow-hidden border-2 border-orange-100">-->
<!--      <img v-if="getVendors?.vendor_img" class="w-full object-cover" :src="$img+getVendors.vendor_img" alt="Avatar Chef">-->
<!--      <img class="w-full object-cover" src="../assets/img/vendor.png" alt="Avatar Chef">-->
<!--    </div>-->
<!--  </div>-->
<!--  <div v-if="getCartItems?.items?.length">-->
<!--    <div  class="mt-4 flex flex-col gap-4" v-for="(item, index) in getCartItems.items">-->
<!--      <div class="flex gap-5">-->
<!--        <div class="w-24 h-24 rounded-lg overflow-hidden flex shrink-0">-->
<!--          <img class="w-full object-cover" :src="$img+item.image" alt="Food Photo">-->
<!--        </div>-->
<!--        <div class="flex items-center justify-between w-full">-->
<!--          <div class="flex flex-col justify-between gap-4">-->
<!--            <div>-->
<!--              &lt;!&ndash;                  <h4 class="text-gray-700">{{ item?.food?.name }}</h4>&ndash;&gt;-->
<!--              <h4 class="font-bold text-gray-700">{{ item?.price }} {{ $t('sum') }}</h4>-->

<!--            </div>-->
<!--            <div class="flex gap-3 items-center">-->
<!--              <button :disabled="isDisbale" @click.stop="increment(item)"-->
<!--                      class="w-7	h-7 rounded bg-gray-200 flex items-center justify-center cursor-pointer">-->
<!--                <span class="line"></span>-->
<!--              </button>-->
<!--              <span class="font-semibold text-gray-700">{{ item.count }}</span>-->
<!--              <button :disabled="isDisbale" @click.stop="decrement(item)"-->
<!--                      class="w-7	h-7 rounded bg-gray-200 flex items-center justify-center cursor-pointer">-->
<!--                <span class="text-gray-700 text-3xl leading-none -translate-y-1">+</span>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div @click.stop="itemOrderRemove(item.id)">-->
<!--            <the-icon class="flex shrink-0 cursor-pointer" src="dark-x"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->
<!--  <div-->
<!--    @click="comment = true"-->
<!--    style="box-shadow: -5px 2px 20px -11px rgba(0, 0, 0, 0.14);"-->
<!--    class="mt-8 px-4 py-2.5 border border-gray-200 rounded-md flex flex-col gap-3"-->
<!--  >-->
<!--    <div-->
<!--      class="flex items-center justify-between"-->
<!--    >-->
<!--      <div class="flex gap-2 items-center">-->
<!--        <the-icon src="document"/>-->
<!--        <h3 class="text-sm font-medium text-gray-700">{{ $t('comment-order') }}</h3>-->
<!--      </div>-->
<!--      <div class="cursor-pointer" v-if="comment" @click.stop="comment = false">-->
<!--        <the-icon src="dark-x"/>-->
<!--      </div>-->
<!--    </div>-->
<!--    <textarea ref="input_text" v-show="comment" v-model="comment_text" class="w-full bg-gray-100 rounded-lg outline-orange-600 p-1"-->
<!--              rows="4"></textarea>-->
<!--  </div>-->
<!--  <div class="flex items-center justify-between mt-5">-->
<!--    <div class="flex items-center gap-2">-->
<!--      <h3 class="text-gray-700 font-semibold">{{ $t('cutlery') }}</h3>-->
<!--      <the-icon src="information-circle"/>-->
<!--    </div>-->
<!--    <div class="container-switch">-->
<!--      <input v-model="choose" type="checkbox" id="switch">-->
<!--      <label for="switch">-->
<!--        <div class="switch">-->
<!--          <div class="bar"></div>-->
<!--        </div>-->
<!--      </label>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div v-if="choose" class="mt-4 flex flex-col gap-4">-->
<!--    <div class="flex gap-5">-->
<!--      <div class="w-24 h-24 rounded-lg overflow-hidden flex shrink-0">-->
<!--        <img class="w-full object-cover" src="https://picsum.photos/100" alt="Food Photo">-->
<!--      </div>-->
<!--      <div class="flex items-center justify-between w-full">-->
<!--        <div class="flex flex-col justify-between gap-4">-->
<!--          <div>-->
<!--            <h4 class="text-gray-700">{{ $t('warm-salad') }}</h4>-->
<!--            <h4 class="font-bold text-gray-700">15,000 сум</h4>-->
<!--          </div>-->
<!--          <div class="flex gap-3 items-center">-->
<!--            <div class="w-7	h-7 rounded bg-gray-200 flex items-center justify-center cursor-pointer">-->
<!--              <span class="line"></span>-->
<!--            </div>-->
<!--            <span class="font-semibold text-gray-700">1</span>-->
<!--            <div class="w-7	h-7 rounded bg-gray-200 flex items-center justify-center cursor-pointer">-->
<!--              <span class="text-gray-700 text-3xl leading-none -translate-y-1">+</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <the-icon class="flex shrink-0 cursor-pointer" src="dark-x"/>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--  <button @click.stop="orderListSee" class="w-full text-white bg-orange-600 py-3 rounded-3xl font-semibold mt-8">-->
<!--    {{ formatPrice($store.state.cart.cartItem) }} сум перейти к оплате-->
<!--  </button>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapGetters} from "vuex";-->
<!--export default {-->
<!--  name: "cart-delateles",-->
<!--  data () {-->
<!--    return {-->
<!--      comment: false,-->
<!--      choose: false,-->
<!--      comment_text: '',-->
<!--      priceCount: 0,-->
<!--      isDisbale: false,-->
<!--      isDetales: false,-->
<!--    }-->

<!--  },-->
<!--  methods: {-->
<!--    orderListSee() {-->
<!--      if (this.comment_text) {-->
<!--        this.$router.push({path: this.localePath('/order'),-->
<!--          query: {comment_text: this.comment_text , order_id: this.$route.query.order_id}})-->
<!--      } else {-->
<!--        this.comment = !this.comment;-->
<!--        setTimeout(() => {-->
<!--          this.$refs.input_text.focus()-->
<!--        },0)-->
<!--      }-->
<!--    },-->
<!--    formatPrice(item) {-->
<!--      const data = item?.delivery_price ?-->
<!--        item?.total_price + item?.delivery_price :-->
<!--        item?.total_price + 10000 + '+';-->
<!--      return data-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters('cart',['getCartItems', 'getVendors'])-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
