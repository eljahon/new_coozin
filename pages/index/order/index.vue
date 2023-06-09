<template>
  <div class="main-styles py-8 flex flex-col gap-7">
    <div class="container mx-auto flex items-center gap-3 px-4">
      <nuxt-link to="/">
        <the-icon src="home"/>
      </nuxt-link>
      <the-icon src="right-arrow-black"/>
      <span class="text-sm font-medium text-gray-500 cursor-pointer">{{ $t('decor-order') }}</span>
    </div>
    <div class="container mx-auto flex gap-9 xl:px-0 justify-center xl:flex-nowrap flex-wrap px-2">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
        <form novalidate class="bg-white w-full p-6 rounded-lg" @submit.prevent="handleSubmit(orderCreate)">
          <h1 class="font-semibold text-gray-800 text-2xl mb-5">{{ $t('decor-order') }}</h1>

          <!-- Dilevery Adress -->
          <h2 class="font-semibold text-xl text-gray-700">{{ $t('dilevery-address') }}</h2>
          <div class="my-3 flex xl:justify-between justify-center gap-4 md:flex-nowrap flex-wrap">
            <ValidationProvider
              v-slot='{ errors }'
              name='user_adress'
              rules='required'
              mode='eager'
              class="md:w-full sm:w-96 w-80"
            >
              <div class="flex items-end sm:gap-2.5 gap-1.5 justify-between sm:w-96 w-80 input-400">
                <div class="relative w-full">
                  <div class="flex w-full">
                    <label for="address"
                           :class="errors.length ? 'font-medium text-red-500' : 'font-medium text-gray-700'">
                      {{ $t('delivery-place') }}
                    </label>
                  </div>
                  <div class="relative mt-3">
                    <input
                      type="text"
                      ref="inputaddress"
                      name="user_adress"
                      autocomplete="off"
                      v-model="order_form.user_adress"
                      :class="errors.length ? 'border-red-500 border-2' : ''"
                      class="bg-white pr-2 outline-orange-600 w-full block pl-11 h-12 input-styles px-4 py-2 placeholder-gray-400 border text-gray-500 rounded-lg border-gray-200 text-base focus:outline-none focus:border-orange-600"
                      :placeholder="$t('matonat-street')+', 35'"
                      @focus="showOptions = true"
                      @blur="showOptions=false"
                      :readonly="true"
                    />
                    <img class="absolute position" :src="require(`~/assets/svg/location.svg`)"
                         :alt="'location' + 'svg'">

                  </div>
                  <div v-if="showOptions" class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                    <ul class="h-[300px] overflow-y-scroll scroll-style" @mousedown.prevent>
                      <li v-for="(item, index) in userAddress" class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          :key="index" @click.stop="orderAddress(item)">{{ item.address }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="map-card" @click="openMaps">
                  <the-icon src="map"/>
                </div>
              </div>
            </ValidationProvider>
            <the-input
              styles="flex flex-col gap-3 md:w-full sm:w-96 w-80"
              label-styles="font-medium text-gray-700"
              input-styles="sm:w-96 w-80 input-400 rounded-lg"
              type="text"
              icon="office"
              name="address"
              :label="$t('reference-point')"
              :placeholder="$t('matonat-street')+', 35'"
              :v-model="order_form.comment"
            />
          </div>


          <!-- Dilevery Time -->
          <h2 class="font-semibold text-xl text-gray-700 mb-2 mt-5">{{ $t('dilevery-time') }}</h2>
          <div class="my-3 flex xl:justify-between justify-center gap-4 md:flex-nowrap flex-wrap">
            <!--            to day-->
            <ValidationProvider
              v-slot='{ errors }'
              name='delivery_time'
              rules='required'
              mode='eager'
              class="md:w-full sm:w-96 w-80"
            >
              <div class="flex flex-col input-styles sm:w-96 w-80 input-400">
                <label
                  for="dilevery-time"
                  :class="errors.length ? 'text-red-500' : ''"
                  class="font-medium text-gray-700"
                >
                  {{ $t('day') }}
                </label>

                <thedropdown
                  v-if="$store.state.days_list&&$store.state.days_list.length"
                  id="delivery_time"
                  name="delivery_time"
                  iconName="calendar"
                  selected
                  :placeholder="$t('to-day')"
                  v-model="order_form.to_day"
                  :errors="errors.length!==0 ? true : false"
                  :options="$store.state.days_list.map(el => {
                         return {
                          label: el.seeDate+ ' ' + el.name,
                          value: el.date
                        }
    })">
                </thedropdown>

              </div>
            </ValidationProvider>
            <!--            time select-->
            <ValidationProvider
              v-slot='{ errors }'
              name='delivery_time'
              :rules="{'required': order_form.is_later}"
              mode='eager'
              class="md:w-full sm:w-96 w-80"
            >
              <div class="flex flex-col input-styles sm:w-96 w-80 input-400">
                <label
                  for="dilevery-time"
                  :class="errors.length ? 'text-red-500' : ''"
                  class="font-medium text-gray-700"
                >
                  {{ $t('time') }}
                </label>

                <thedropdown
                  id="delivery_time"
                  name="delivery_time"
                  iconName="clock-gray"
                  selected
                  :placeholder="$t('usually-order')"
                  v-model="order_form.delivery_time"
                  :errors="errors.length !== 0 ? true : false"
                  v-if="$store.state.cart.timList&&$store.state.cart.timList.length"
                  :options="$store.state.cart.timList"
                >

                </thedropdown>

              </div>
            </ValidationProvider>
          </div>

          <!-- Dilevery Time -->
          <h2 class="font-semibold text-xl text-gray-700 mb-2 mt-7">{{ $t('payment') }}</h2>
          <div class="my-3 flex xl:justify-between justify-center gap-4 md:flex-nowrap flex-wrap">
            <ValidationProvider
              v-if="cardList.length"
              v-slot='{ errors }'
              name='delivery_time'
              rules='required'
              mode='eager'
              class="md:w-full sm:w-96 w-80"
            >
              <div class="flex flex-col input-styles sm:w-96 w-80 input-400">
                <label
                  for="dilevery-time"
                  :class="errors.length ? 'text-red-500' : ''"
                  class="font-medium text-gray-700"
                >
                  {{ $t('card-for-payment') }}
                </label>

                <thedropdown
                  id="delivery_time"
                  name="delivery_time"
                  iconName="calendar"
                  selected
                  :placeholder="'13:00 -14:00'"
                  v-model="order_form.delivery_time"
                  :errors="errors.length!==0 ? true : false"
                  :options="cardList"></thedropdown>


              </div>
            </ValidationProvider>
            <div v-else
                 class="w-full border border-gray-200 mt-2 gap-3 cursor-pointer rounded-md h-12 flex items-center justify-center p-3.5"
                 @click="">
              <the-icon width="10" height="10" src="add-plus"/>
              <span>{{ $t('add-cart') }}</span>
            </div>
            <div class="md:w-full sm:w-96 w-80 items-end xl:m-0 mt-5">
              <h3 class="text-lg font-semibold text-gray-700">{{ $t('to-pay') }}</h3>
              <div class="rounded-lg p-3 total_summ -mx-0 mt-2">
                <div class="flex justify-between">
                  <h4 class="text-gray-600">{{ $t('dishes') }}</h4>
                  <h4 class="font-medium text-gray-600">{{ getCartItems.total_price }} {{ $t('sum') }}</h4>
                </div>
                <div class="flex justify-between my-2">
                  <h4 class="text-gray-600">{{ $t('delivery') }}</h4>
                  <h4 class="font-medium text-gray-600"> {{ del_price > 0 ? del_price : 9000 + ' +' }}
                    {{ $t('sum') }}</h4>
                </div>
                <div class="flex justify-between">
                  <h4 class="font-bold text-gray-600">{{ $t('total') }}</h4>
                  <h4 v-if="getCartItems?.delivery_price !== null" class="font-bold text-gray-600">
                    {{ formatPrice(getCartItems) + (del_price > 0 ? del_price : 9000) }} {{ $t('sum') }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="w-full  h-12 rounded-3xl mt-12 cursor-pointer"
            :class="{'bg-orange-600 text-white':!invalid,'text-gray-400 font-semibold bg-gray-300': invalid }"
          >
            {{ $t('pay') }}
          </button>
        </form>
      </ValidationObserver>

      <div class="bg-white xl:w-80 w-full rounded-2xl px-2 py-4 flex flex-col gap-3 shrink-0">
        <h2 class="font-semibold text-gray-800 text-2xl mx-2">{{ $t('your-order') }}</h2>
        <div class="flex flex-col gap-3 overflow-y-scroll scroll-style pl-2 pr-4" style="max-height: 516px;">
          <div v-if="getCartItems && getCartItems.items && getCartItems.items.length">
            <div v-for="(item, index) in getCartItems.items" :key="index">
              <div class="flex gap-4">
                <div class="w-24 h-24 overflow-hidden border border-gray-100 rounded-lg">
                  <img class="w-full" :src="$img+item.image" alt="Food Image">
                </div>
                <div class="flex flex-col gap-1">
                  <h4 class="font-normal text-gray-700">{{ item.name }}</h4>
                  <h4 class="font-bold text-gray-700">{{ item.count }}х{{ item.price }} {{ $t('sum') }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <order-yandex-maps :is-maps="$store.state.mapOrder" :set-is-maps="setIsMaps"
                       @changePlice="changePlice"></order-yandex-maps>
    <cards-form-modal :fetach="getMyCard"/>
  </div>
</template>
<script>
import cardsFormModal from "@/components/card-modal/cards-form-modal";
import orderYandexMaps from "@/components/yandex-maps/order-yandex-maps";
import dayjs from 'dayjs'
import {mapGetters} from "vuex";
import thedropdown from "../../../components/thedropdown/thedropdown";

export default {
  components: {
    cardsFormModal,
    orderYandexMaps,
    thedropdown
  },
  data() {
    return {
      paymentType: [],
      isAdders: true,
      showOptions: false,
      workdays: null,
      timeList: [],
      vendor: null,
      address_id: [],
      userAddress: [],
      del_price: 0,
      seeletLocation: {},
      order_form: {
        user: this?.$auth?.user?.id,
        payment_type: 2,
        user_adress: '',
        is_later: false,
        delivery_price: null,
        delivery_time: null,
        comment: this.$route.query.comment_text,
        cart: this.$route.query.cart_id,
        dish_items: [],
        to_day: null

      },
      severTime: null,
      vendorWorktime: null,
      isSubimt: true,
      cardList: [],
      isCardOpen: false,
    }
  },
  async fetch() {
    try {
      await this.getServerTime()
      await this.getOrderItem()
      await this.getMyPlace()
      await this.getPaymentType()
      await this.getItemVendor()
      await this.getMyCard()
      // await this.getDishs()

    } catch (err) {
      throw new Error(err)
    }
  },
  async mounted() {
    try {
      await this.getDate()
      this.checkTimeNow()
    } catch (err) {
      console.log(err)
    }
  },
  watch: {
    'order_form.payment_type': function (val) {
      console.log(val)
      if (val === 2) {
        this.isCardOpen = true;
        this.getMyCard()
      } else {
        this.isCardOpen = false
      }
    },
    'order_form.to_day': function (val) {
      this.setDateSelect(val)
    },
    'order_form.is_later': function (val) {
      console.log(val)
      if (val) {
        this.setVendorWorkDay()
        this.checkfoodTime()
      } else {
        this.$store.dispatch('set_day')
      }
    },
    // 'order_form.delivery_time': function (val) {
    //   console.log(val)
    // }
  },
  methods: {
    checkfoodTime() {
      console.log(this.$store.state.cart.foodsTime)
    },
    onChildClick(event) {
      console.log('Child clicked');
      // event.stopPropagation();
    },
    selectOption(item) {
      this.selectedOption = item;
      console.log(item)
    },
    async checkTimeNow() {
      const _data = await this.getVendorWorkingTime()
      let _timeFormat = this.timeFormat(_data)
      let _statrNow = this.$dayjs(this.$dayjs().hour(_timeFormat.start[0]).minute(_timeFormat.start[1])).diff(Date.now(), 'hour');
      let _endNow = this.$dayjs(this.$dayjs().hour(_timeFormat.end[0]).minute(_timeFormat.end[1])).diff(Date.now(), 'hour');
      this.timeNotications(_statrNow, _endNow)
      // this.checkfoodTime()
    },
    timeFormat(item) {
      return {
        start: item.work_start_time.split(":").map(Number),
        end: item.work_end_time.split(":").map(Number)
      }
    },
    timeNotications(startWorkTime, endWorkTime, isSubmit) {
      console.log(startWorkTime, endWorkTime)
      if (startWorkTime <= 0 && endWorkTime > 0) {
        this.$toast.success(this.$t('today-order-yes'))
      } else if (isSubmit) {
        this.isSubimt = false;
        this.$toast.error(this.$t('today-order-not'))
      }
    },
    formatPrice(item) {
      return item?.total_price
    },
    async getItemVendor() {
      try {
        const {data} = await this.$axios.get(`vendors/${this.$route.query.vendor_id}`, {
          params: {
            populate: "*", filters: {id: {$eq: this.$route.query.vendor_id}}
          }
        })
        this.workdays = data.working_days;
      } catch (err) {
        return new Error(err)
      }
    },
    setIsMaps() {
      const isOpneMaps = this.$store.state.mapOrder
      this.$store.dispatch('setMapOrder', !isOpneMaps)
    },
    async getServerTime() {
      try {
        const {data} = await this.$store.dispatch('cart/serverTime')
        this.order_form.delivery_time = data.time
        this.severTime = data.time
      } catch (err) {
        return new Error(err)
      }
    },
    async getDishs() {
      try {
        return await this.$store.dispatch('cart/getDishs', {
          id: this.$route.query.cart_id
        })
      } catch (e) {
        return new Error(e)
      }
    },
    async setVendorWorkDay() {
      this.$store.dispatch('setVendorWeekday', this.workdays.map((el) => el.name))
    },
    async changePlice(item) {
      const data = await this.getSelecPlaceFilters(item.fullName);
      if (data.length === 0) {
        const {data: {data}} = await this.userAddresses(item);
        this.order_form.user_adress = data.attributes.address;
        this.order_form.comment = data.attributes.comment;
        this.seeletLocation = data.attributes.location
        this.address_id = [data.id];
        await this.getDeliveryPrice()
      }
      this.isAdders = false;
    },
    async orderAddress(item) {
      this.order_form.user_adress = item.address;
      this.seeletLocation = item.location;
      this.address_id = [item.id]
      this.showOptions = false;
      await this.getDeliveryPrice()
      this.$refs.inputaddress.blur()
    },
    async getDeliveryPrice() {
      try {
        const _params = {
          vendor: this.$route.query.vendor_id,
          lat: Number(this.seeletLocation.lat),
          long: Number(this.seeletLocation.long),
        }
        const {data} = await this.$axios.get('vendors/calc/delivery', {params: _params})
        this.del_price = data.price;
        this.order_form.delivery_price = data.price
        return data

      } catch (err) {
        throw new Error(err)
      }
    },
    addCardModalOpen() {
      this.$routePush({...this.$route.query, cardAdd: 'cardAdd'})
    },
    openMaps() {
      this.setIsMaps()
    },
    async orderCreate() {
      // this.timeNotications(0, 0, true)
      const day = this.order_form.to_day;
      delete this.order_form.to_day;
      this.order_form.delivery_time = this.order_form.delivery_time ?? ''
      try {
        const _order_form = {
          ...this.order_form,
          delivery_time: day ? day + ' ' + this.order_form.delivery_time : this.$dayjs().format('YYYY-MM-DD') + ' ' + this.order_form.delivery_time,
          user_adress: this.address_id[0],
        }
        const data = await this.$axios.post('orders', {..._order_form})
        this.$router.push({path: this.localePath('/my-orders')})
        this.$toast.success(this.$t('new_order_create'))
      } catch (err) {
        console.log(err)
        return new Error(err)
      }
    },
    async getDate() {
      return this.$store.dispatch('set_day')
    },
    setDateSelect(item) {
      const today = this.$dayjs().format('YYYY-MM-DD')
      if (item !== today) {
        this.order_form.is_later = true
        this.$store.dispatch('cart/isToDay')
      } else {
        this.order_form.is_later = false
      }
    },
    async getMyCard() {
      try {
        await this.$store.dispatch('cards/getCards', {
          filters: {
            user: this.$auth.user.id
          },
          populate: '*'
        })
          .then(res => {
            this.cardList = res.map((el) => {
              return {
                label: el.card_number,
                value: el.id
              }
            })
          })
        // const {objects} = await this.$axios.get('cards');
      } catch (err) {
        return new Error(err)
      }
    },
    async getOrderItem() {
      try {
        const data = await this.$store.dispatch('cart/getCardItem',
          {id: this.$route.query.cart_id, locale: this.$i18n.locale})
        console.log(data, 'times items')
        await this.$store.dispatch('cart/timeGeneret', data)
      } catch (err) {
        return new Error(err)
      }
    },
    async getPaymentType() {
      try {
        const {data: {results}} = await this.$axios.get('payment-types', {
          params: {
            populate: '*',
            locale: this.$i18n.locale,
            filters: {
              id: {
                $ne: 1
              }
            }
          }
        })
        this.paymentType = results.map((el) => {
          return {
            value: el.id,
            label: el.name
          }
        })
      } catch (err) {
        return new Error(err)
      }
    },
    haverMouseLeve() {
      this.showOptions = false;
      this.$refs.inputaddress.blur()
    },
    async getMyPlace() {
      try {
        const {data: {results}} = await this.$axios.get('user-adresses', {
          params: {
            populate: "*",
            sort: [
              'createdAt:desc'
            ],
            filters: {
              user: {
                id: {
                  $eq: this.$auth.user.id
                }
              }
            }
          }
        })
        this.userAddress = results.map((el) => {
          return {
            address: el.address,
            id: el.id,
            location: el.location
          }
        })
      } catch (err) {
        return new Error(err)
      }
    },
    async getSelecPlaceFilters(address) {
      try {
        const {data: {results}} = await this.$axios.get('user-adresses', {
          params: {
            populate: '*',
            filters: {
              address: address
            }
          }
        })
        const data = results.map((el) => {
          return {
            address: el.address,
            id: el.id,
            location: el.location
          }
        })
        return data
      } catch (err) {
        return new Error(err)
      }
    },
    async userAddresses(item) {
      try {
        const _user_address = {
          address: item.fullName,
          comment: item.getNames[0].name,
          location: {
            lat: item.getNames[0].latitude,
            long: item.getNames[0].longitude
          },
          user: this.$auth.user.id

        };
        const data = await this.$axios.post('user-adresses', {data: _user_address})
        await this.getMyPlace()
        return await data
      } catch (err) {
        return new Error(err)
      }
    },
    async getVendorWorkingTime() {
      try {
        const data = await this.$store.dispatch('cart/getSetting');
        this.vendorWorktime = data;
        return data;
      } catch (err) {
        return new Error(err)
      }
    },
  },
  computed: {
    ...mapGetters('cart', ['getCartItems'])
  },

}
</script>
<style scoped>
.scroll-style::-webkit-scrollbar {
  height: 0;
  width: 3px;
  border-radius: 24px;
}

.scroll-style::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scroll-style::-webkit-scrollbar-thumb {
  background: #bcbcbc;
}

.scroll-style::-webkit-scrollbar-thumb:hover {
  background: #a4a4a4;
}

.main-styles {
  background: #F3F4F6;
}

.map-card {
  background: #FFFFFF;
  box-shadow: -3px -2px 20px -10px rgba(0, 0, 0, 0.19), 0px 4px 7px -1px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.position {
  top: 50%;
  transform: translate(0, -50%);
  left: 12px;
}

.position-rigth {
  top: 50%;
  transform: translate(0, -50%);
  right: 12px;
}


.container-switch input[type="checkbox"] {
  display: none;
}

.container-switch label .switch {
  background: linear-gradient(90deg, #fd9657 0%, #EA580C 100%);
  width: 36px;
  height: 20px;
  border-radius: 50px;
  padding: 1.5px;
  position: relative;
  border: 2px #fff solid;
}

.container-switch input[type="checkbox"] + label .bar {
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
  height: 14px;
  width: 14px;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
}

.container-switch input[type="checkbox"]:checked + label .bar {
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
  /* margin-left: auto; */
  transform: translateX(16px);
}

.container-switch label:active .bar {
  /* background-color: red; */
  box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0.322);
}

@media screen and (max-width: 400px) {
  .input-400 {
    width: 300px !important;
  }
}

.total_summ {
  border: 1px solid #E5E7EB;
}

</style>
