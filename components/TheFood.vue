<template>
  <div class="food">
    <div class="food-modal">
      <div class="flex md:flex-nowrap flex-wrap  md:p-4 p-3 rounded-t-2xl overflow-hidden md:gap-5 gap-3 food-modal__item">
        <div class="flex flex-col md:gap-3 gap-2">
          <div class="img">
            <img v-if="item?.media[0]?.aws_path" class="w-full h-full object-cover" :src="$img+item.media[0]?.aws_path"  alt="Phone">
            <img v-else class="w-full h-full object-cover" src="@/assets/img/img-1.jpg" alt="Phone">
          </div>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <img v-if="user?.user?.avatar?.aws_path" class="w-full object-cover" :src="$img+user.user.avatar?.aws_path" alt="Avatar">
              <img v-else class="w-full object-cover" :src="img" alt="Avatar">
            </div>
            <div class="flex flex-col gap-2">
              <h3 v-if="user &&user?.user&&user?.user?.first_name" class="font-medium text-gray-700 md:text-xl text-lg">{{ user?.user?.first_name+user?.user?.last_name }}</h3>
              <h3 v-else class="font-medium text-gray-700 md:text-xl text-lg">{{ 'No user name' }}</h3>
              <div class="flex gap-3">
                <div class="flex items-center bg-gray-100 gap-1 py-1 px-2 overflow-hidden rounded-full">
                  <img width="16" height="16" src="@/assets/svg/rate.svg" alt="Rate icon">
                  <span class="text-xs text-gray-800 font-medium">{{item.ratings_avg}}</span>
                </div>
                <div class="flex items-center bg-gray-100 gap-1 py-1 px-2 overflow-hidden rounded-full">
                  <img width="16" height="16" src="../assets/svg/car.svg" alt="Car icon">
                  <span class="text-xs text-gray-800 font-medium">{{item?.delivery_price ? item?.delivery_price : '10000+'}} сум</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between gap-2">
          <div class="flex flex-col md:gap-2 gap-1 w-full modal-text">
            <h2 class="font-normal md:text-xl text-lg text-gray-800">{{ item.name }}</h2>
            <h4 class="md:text-xl text-lg font-semibold text-gray-700">{{ item.price }} {{$t('sum')}} <span class="font-normal">/порция</span></h4>
            <div class="flex gap-1.5">
              <div class="bg-orange-50 rounded-lg p-1.5 flex gap-2 items-center">
                <p class="text-orange-600 text-sm font-medium">{{$t('amount')}}: {{item.amount ? item.amount : '0'}}</p>
              </div>
              <div class="bg-slate-100 rounded-lg p-1.5 flex gap-2 items-center">
                <p class="text-black  text-sm font-medium">{{$t('minimum-order-quantity')}}:{{item.min_amount ? item.min_amount : '0'}}</p>
              </div>
            </div>
            <h2 class="font-semibold text-gray-700 mt-1">{{$t('description')}}</h2>
            <p class="font-normal text-gray-700 text-sm">{{ item.description }}</p>
            <h2 class="font-semibold text-gray-700 mt-1">{{$t('composition')}}</h2>
            <div class="flex flex-wrap sm:gap-2 gap-1">
              <!-- <div v-for="data in item.ingredients" class="flex flex-wrap sm:gap-2 gap-1">
                <div class="border-2 rounded-2xl px-2 pt-0 pb-1 border-gray-100" v-for="item in data.split(',')">
                  <span class="text-xs text-gray-600">{{ item }}</span>
                </div>
              </div> -->
            </div>
          </div>
          <div class="flex lg:gap-16 sm:gap-4 justify-between">
            <div class="flex gap-6 items-center">
              <div @click.stop="increment"> <the-icon  class="cursor-pointer w-8" src="minus" /></div>
              <span class="text-gray-700 font-semibold">{{count >=item.min_amount ? count : item.min_amount}}</span>
              <div @click.stop="decrement">
                <the-icon  class="cursor-pointer w-8" src="plus" />
              </div>
            </div>
            <button
              @click.stop="addCazinaOrder"
              class="bg-orange-600 py-2.5  text-center sm:w-56 w-40 text-white rounded-3xl"
            >
              {{$t('Add-to-cart')}}
            </button>
          </div>
        </div>
        <div @click="isSee" class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center relative x-position cursor-pointer">
          <the-icon src="x" />
        </div>
      </div>
    </div>
    <div class="food-background" @click="isSee"></div>
  </div>
</template>

<script>
import img from '~/assets/img/vendor.png'
export default {
  props: ['item', "user", 'isSee'],
  data() {
    return {
      count: 0,
      img: img,
      disbaledClass: false,
      login: {
        phone: '',
        password: ''
      }
    }
  },

  methods: {
  async  increment() {
    if (this.count>this.item.min_amount) {
      this.count--;
      }
      else {
      this.$toast.error(`${this.$t('minimum-order-quantity')}: ${this.count}`)
    }
    },
   async decrement(){
     if (this.count === this.item.amount) {
       this.$toast.error(this.$t('all-now'))
     } else {
       if (this.count < this.item.min_amount) {
         this.count = this.item.min_amount;
         this.count++;
       } else {
         this.count++;
       }
     }

   },
   async addCazinaOrder () {
  try {
    if(this.$auth.loggedIn) {
      if (this.item.amount > 0) {
        const newItem = {
          vendor: this.item.vendor.id,
          user: this.$auth.user.id,
          items: [
            {
              product: this.item.id,
              count: parseInt(this.count) > parseInt(this.item.min_amount) ? this.count : this.item.min_amount
            }
          ]
        }
        const data = await this.$store.dispatch('cart/newOrderCreate',newItem)
        this.isSee();

      } else {
        this.isSee();
        this.$toast.error(this.$t('amount-not'))
      }
      // await this.closeModal()
      //   .then(res => {
      if(data) {
        this.isSee()
        await this.$store.dispatch('cart/getCardList', {
          populate: 'vendor, vendor.user, order_items'
        })
      }

        // })
    } else {
      this.$toast.info(this.$t('you-are-login'))
    }
  } catch (err) {
    return  new Error(err)
  }
    },
  },
  mounted() {
    this.count = this.item.min_amount
  }
}
</script>

<style scoped>
.disbaledClass {
  pointer-events: none;
}
.food-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: #111827;
  opacity: 0.3;
}
.x-position {
  position: absolute;
  top: 14px;
  right: 14px;
}
.img {
  width: 400px;
  height: 370px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
}
.avatar {
  border: 3px solid #EFEFEF;
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 100%;
}
.food-modal {
  position: fixed;
  z-index: 11;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 16px;
}

@media screen and (max-width: 992px) {
  .img {
    width: 360px;
    height: 320px;
  }
}
@media screen and (max-width: 768px) {
  .img {
    height: 250px;
  }
}
@media screen and (max-width: 400px) {
  .img {
    width: 100%;
    height: 200px;
  }
  .food-modal {
    left: 8px;
    right: 8px;
    transform: translate(0, -50%);
  }
}
</style>
