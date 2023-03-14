<template>
  <div class="main-styles py-8 flex flex-col gap-7">
    <div class="container mx-auto flex items-center gap-3 px-4">
      <nuxt-link to="/">
        <the-icon src="home" />
      </nuxt-link>
      <the-icon src="right-arrow-black" />
      <span class="text-sm font-medium text-gray-500 cursor-pointer">{{$t('decor-order')}}</span>

    </div>
    <div class="container mx-auto flex gap-9 xl:px-0 xl:flex-nowrap	flex-wrap px-2">

      <ValidationObserver class="w-full" ref="observer" v-slot="{ handleSubmit, invalid }">
      <form novalidate class="bg-white w-full p-6 rounded-lg" @submit.prevent="handleSubmit(orderCreate)">
        <h1 class="font-semibold text-gray-800 text-2xl">{{$t('decor-order')}}</h1>
        <div class="flex items-center pl-4 rounded dark:border-gray-700">
          <input id="bordered-checkbox-1" type="checkbox" v-model="order_form.is_later" value="" name="bordered-checkbox" class="w-4 h-4 text-orange-500 bg-orange-500 rounded focus:ring-orange-500 dark:focus:ring-orange-500 dark:ring-offset-orange-500 focus:ring-2">
          <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{$t('is-later')}}</label>
        </div>
        <div class="px-3 pt-5 flex xl:justify-between justify-center gap-4 lg:flex-nowrap flex-wrap">
          <div>
            <ValidationProvider
              v-slot='{ errors }'
              name='user_adress'
              rules='required'
              mode='eager'
            >

              <div class="flex items-end sm:gap-2.5 gap-1.5 justify-between">
              <div class="relative w-full">
               <div class="flex w-full">
                 <label for="address" :class="errors.length ? 'font-medium text-red-500' : 'font-medium text-gray-700'">{{ $t('delivery-place') }}</label>

               </div>
                <div class="relative mt-3">
                <input
                  type="text"
                  ref="inputaddress"
                  name="user_adress"
                  autocomplete="off"
                  v-model="order_form.user_adress"
                  :class="errors.length ? 'border-red-500 border-2' : ''"
                  class="block pl-11 input-styles w-full px-4 py-2 text-gray-700 placeholder-gray-400 border text-gray-500 rounded-lg border-gray-200 pr-2 pl-11 text-base h-12 focus:outline-none focus:border-orange-600"
                  :placeholder="$t('matonat-street')+', 35'"
                  @focus="showOptions = true"
                  :readonly="true"


                />
                <img class="absolute position"  :src="require(`~/assets/svg/location.svg`)" :alt="'location' + 'svg'" >

              </div>
                <div v-if="showOptions" class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg" >
                  <ul class="h-[300px] overflow-y-scroll scroll-style" @mouseleave="haverMouseLeve">
                    <li v-for="(item, index) in userAddress" class="px-4 py-2 cursor-pointer hover:bg-gray-100" :key="index" @click.stop="orderAddress(item)" >{{item.address}}</li>
                  </ul>
                </div>
              </div>

                <div class="map-card" @click="openMaps">
                  <the-icon src="map" />
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              v-slot='{ errors }'
              name='delivery_time'
              rules='required'
              mode='eager'
            >
              <div class="flex flex-col gap-3 input-styles sm:w-96 w-80 input-400 mt-6">

                <label for="dilevery-time" :class="errors.length ? 'text-red-500' : ''" class="font-medium text-gray-700">{{$t('time-delivery')}}</label>

                <div class="relative">
                  <select
                    class="bg-white w-full text-gray-500 border rounded-lg border-gray-200 py-2.5 pr-2 pl-11 text-base h-12 outline-orange-600"
                    :class="{'border-red-500 border-2': errors.length, 'bg-gray-200': isAdders}"
                    id="dilevery-time"
                    name="dilevery-time"
                    placeholder="'13:00 -14:00'"
                    style="-webkit-appearance: none;"
                    v-model="order_form.delivery_time"
                  >
                    <option value="13:00 -14:00" disabled selected hidden>13:00 -14:00</option>
                    <option v-for="(item, index) in timeList" :value="item" :key="index">{{item}}</option>

                  </select>
                  <img class="absolute position" src="../../../assets/svg/clock-gray.svg" alt="Input icon" >
                  <img class="absolute position-rigth" src="../../../assets/svg/arrow-bottom.svg" alt="Arrow icon">
                </div>

              </div>
            </ValidationProvider>
            <ValidationProvider
              v-if="isCardOpen"
              v-slot='{ errors }'
              name='card_id'
              rules='required'
              mode='eager'
            >
              <div class="flex flex-col gap-3 input-styles sm:w-96 w-80 input-400 mt-6">
                <label for="payment_type" :class="errors.length ? 'text-red-500' : ''" class="font-medium text-gray-700">Мои карты</label>
               <div class="flex gap-2">
                 <div class="relative w-full">
                   <select
                     class="bg-white w-full text-gray-500 border rounded-lg border-gray-200 py-2.5 pr-2 pl-11 text-base h-12 outline-orange-600"
                     id="payment_type"
                     :class="errors.length ? 'border-red-500 border-2' : ''"
                     name="payment_typee"
                     v-model="order_form.card_id"
                     style="-webkit-appearance: none;"
                   >
                     <option v-for="(item, ind) in cardList" :key="ind" :value="item.value">{{item.label}}</option>
                   </select>
                   <img class="absolute position" src="../../../assets/svg/cash.svg" alt="Input icon" >
                   <img class="absolute position-rigth" src="../../../assets/svg/arrow-bottom.svg" alt="Arrow icon">
                 </div>
                 <div class="map-card" @click="addCardModalOpen">
                   <the-icon src="plus" />
                 </div>
               </div>
              </div>
            </ValidationProvider>
<!--            </form>-->


          </div>
          <div>
            <the-input
              styles="flex flex-col gap-3 w-full"
              label-styles="font-medium text-gray-700"
              input-styles="sm:w-96 w-80 input-400 rounded-lg"
              type="text"
              icon="office"
              name="address"
              :label="$t('reference-point')"
              :placeholder="$t('matonat-street')+', 35'"
              :v-model="order_form.comment"
            />
            <ValidationProvider
            v-slot='{ errors }'
            name='payment_type'
            rules='required'
            mode='eager'
          >
            <div class="flex flex-col gap-3 input-styles sm:w-96 w-80 input-400 mt-6">
              <label for="payment_type" :class="errors.length ? 'text-red-500' : ''" class="font-medium text-gray-700">{{$t('payment-method')}}</label>
              <div class="relative">
                <select
                  class="bg-white w-full text-gray-500 border rounded-lg border-gray-200 py-2.5 pr-2 pl-11 text-base h-12 outline-orange-600"
                  id="payment_type"
                  :class="{'border-red-500 border-2': errors.length, 'bg-gray-200': isAdders}"
                  name="payment_typee"
                  v-model="order_form.payment_type"
                  style="-webkit-appearance: none;"
                >
                  <option v-for="(item, ind) in paymentType" :key="ind" :value="item.value">{{$t(item.label)}}</option>
                </select>
                <img class="absolute position" src="../../../assets/svg/cash.svg" alt="Input icon" >
                <img class="absolute position-rigth" src="../../../assets/svg/arrow-bottom.svg" alt="Arrow icon">
              </div>
            </div>
            </ValidationProvider>

          </div>

        </div>
        <div class="px-3 pt-5 flex xl:justify-between justify-center gap-4 lg:flex-nowrap flex-wrap">
          <div class="flex items-center justify-between sm:w-96 w-80 input-400">
            <div class="flex items-center justify-center gap-3">
              <h3>{{$t('reorder')}}</h3>
              <the-icon src="information-circle" width="20" height="20" />
            </div>
            <div class="container-switch">
              <input v-model="choose" type="checkbox" name="" id="switch">
              <label for="switch">
                <div class="switch">
                  <div class="bar"></div>
                </div>
              </label>
            </div>
          </div>
          <div class="max-w-sm overflow-x-scroll scroll-style">
            <div class=" sm:flex hidden items-center gap-3.5">
              <div v-for="item in $store.state.days_list">
                <menu-card
                  :date="item"
                  :variant="true"
                  @onDates="setDateSelect"
                />
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="sm:w-96 w-full items-end xl:m-0 mx-auto mt-5">
          <h3 class="text-lg font-semibold text-gray-700">{{$t('to-pay')}}</h3>
          <div class="rounded-lg p-3 total_summ -mx-0 mt-2">
            <div class="flex justify-between">
              <h4 class="text-gray-600">{{$t('dishes')}}</h4>
              <h4 class="font-medium text-gray-600">{{getCartItems.total_price}} {{$t('sum')}}</h4>
            </div>
            <div class="flex justify-between my-2">
              <h4 class="text-gray-600">{{$t('delivery')}}</h4>
              <h4 class="font-medium text-gray-600"> {{del_price > 0 ? del_price : 10000+' +' }} {{$t('sum')}}</h4>
            </div>
            <div class="flex justify-between">
              <h4 class="font-bold text-gray-600">{{$t('total')}}</h4>
              <h4 v-if="getCartItems?.delivery_price !== null" class="font-bold text-gray-600">{{getCartItems.total_price+(del_price ? del_price : 1000) }} {{$t('sum')}}</h4>
              <!--            <h4 v-else class="font-bold text-gray-600">{{Number(getCartItems.total_price)+10000 +"+" }} {{$t('sum')}}</h4>-->
            </div>
          </div>
        </div>
        <button type="submit" class="w-full bg-gray-300 h-12 rounded-3xl text-gray-400 font-semibold mt-12 cursor-pointer">{{$t('pay')}}</button>
      </form>
      </ValidationObserver>
<!--      my order list -->
      <div class="bg-white xl:w-80 w-full rounded-2xl px-2 py-4 flex flex-col gap-3 shrink-0">
        <h2 class="font-semibold text-gray-800 text-2xl mx-2">{{$t('your-order')}}</h2>
        <div class="flex flex-col gap-3 overflow-y-scroll scroll-style pl-2 pr-4" style="max-height: 516px;">
          <div v-if="getCartItems && getCartItems.items && getCartItems.items.length">
            <div v-for="item in getCartItems.items">
              <div class="flex gap-4">
                <div class="w-24 h-24 overflow-hidden border border-gray-100 rounded-lg">
                  <img class="w-full" :src="$img+item.image" alt="Food Image">
                </div>
                <div class="flex flex-col gap-1">
                  <h4 class="font-normal text-gray-700">{{item.name}}</h4>
                  <h4 class="font-bold text-gray-700">{{item.count}}х{{item.price}} {{$t('sum')}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <order-yandex-maps @changePlice="changePlice"></order-yandex-maps>
    <cards-form-modal :fetach="getMyCard" />
  </div>
</template>

<script>
import cardsFormModal from "@/components/card-modal/cards-form-modal";
import orderYandexMaps from "@/components/yandex-maps/order-yandex-maps";
import {mapGetters} from "vuex";
export default {
  components: {
    cardsFormModal,
    orderYandexMaps,
  },
  data() {
    return {
      hover: false,
      paymentType: [],
      isRendor: false,
      isAdders: true,
      showOptions:false,
      timeList: [],
      address_id:[],
      userAddress: [],
      choose: false,
      del_price:0,
      seeletLocation: {},
      order_form: {
        user: this?.$auth?.user?.id,
        payment_type: 2,
        user_adress: '',
        is_later: false,
        delivery_price: null,
        delivery_time: this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
        comment: this.$route.query.comment_text,
        cart: this.$route.query.cart_id
      },
      cardList: [],
      isCardOpen: false
    }
  },
  async fetch () {
    await this.getOrderItem()
    await this.getMyPlace()
    await this.getPaymentType()
    await this.getDate()
  },
  watch: {
    'order_form.payment_type': function (val) {
      if (val === 2) {
        this.isCardOpen = true;
        this.getMyCard()
      } else {
        this.isCardOpen = false
      }
    },
    'order_form.is_later': function (val) {
      console.log(val)
    }
  },
  methods: {
   async changePlice(item) {
 const data =await this.getSelecPlaceFilters(item.fullName);
     if (data.length===0) {
       const {data:{data}} = await this.userAddresses(item);
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
     this.address_id=[item.id]
      this.showOptions = false;
      await this.getDeliveryPrice()
     this.$refs.inputaddress.blur()
   },
    async getDeliveryPrice() {
     try {
       const _params={
         vendor: this.$route.query.vendor_id,
         lat: Number(this.seeletLocation.lat),
         long: Number(this.seeletLocation.long),
       }
       const {data} = await this.$axios.get('vendors/calc/delivery', {params:_params})
       this.del_price = data.price;
       return data

     } catch (err) {
       throw new Error(err)
     }
    },
    addCardModalOpen () {
      this.$routePush({...this.$route.query, cardAdd: 'cardAdd'})
    },
    openMaps () {
      this.$routePush({...this.$route.query,orderMap: 'orderMap'})
    },
   async orderCreate () {
     try {
       const _order_form = {
         ...this.order_form,
         delivery_price:this.del_price,
         user_adress: this.address_id[0],
         cart: this.$route.query.cart_id
       }
       const data  = await this.$axios.post('orders', {..._order_form})
       console.log(data)
       console.log('salom')
     } catch (err) {
       return  new Error(err)
     }
    },
    async getDate () {
      return this.$store.dispatch('set_day')
    },
    setDateSelect (item) {
      console.log(item)
    },
   async getMyCard () {
      try {
        try{
          await this.$store.dispatch('cards/getCards')
            .then(res => {
              this.cardList = res.map((el) => {
                return {
                  label: el.card_number,
                  value: el.id
                }
              })
            })
        } catch (err) {}
        // const {objects} = await this.$axios.get('cards');
      } catch (err) {
        throw  new Error(err)
      }
   },
    async getOrderItem () {
      await this.$store.dispatch('cart/getCardItem',
        {id:this.$route.query.cart_id, locale: this.$i18n.locale})
    },
    async getPaymentType () {
     try {
       const {data: {results}} =  await this.$axios.get('payment-types', {params: {
           populate: '*',
           locale: this.$i18n.locale,
           filters: {
             id : {
               $ne: 1
             }
           }
         }})
       this.paymentType = results.map((el) => {
         return {
           value: el.id,
           label: el.name
         }
       })
     } catch (err)
     {
       throw  new Error(err)
     }
    },
    haverMouseLeve() {
      this.showOptions = false;
      this.$refs.inputaddress.blur()
    },
    async  getMyPlace () {
    try {
       const {data: {results}} =await this.$axios.get('user-adresses', {
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
    }catch (err) {
      throw new Error(err)
    }
},
    async getSelecPlaceFilters (address) {
     try {
       const {data: {results}} = await this.$axios.get('user-adresses',{params: {
         populate: '*',
           filters: {
           address: address
           }
         }})
       const data = results.map((el) => {
         return {
           address: el.address,
           id: el.id,
           location: el.location
         }
       })
       return data
     } catch (err) {
       throw new Error(err)
     }
    },
    async userAddresses (item) {
      try {
        const _user_address = {
          address: item.fullName,
          comment: item.getNames[0].name,
          location: {
            lat:item.getNames[0].latitude,
            long: item.getNames[0].longitude
          },
          user: this.$auth.user.id

        };
        const data = await this.$axios.post('user-adresses', {data: _user_address})
        await this.getMyPlace()
        return await data
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  computed: {
    ...mapGetters('cart', ['getCartItems'])
  },
  mounted() {
    setTimeout(() => {
      this.isRendor = true
    }, 0)
  }
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
