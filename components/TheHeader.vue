<template>
  <div>
    <header class="header">
      <nav class="container mx-auto sm:py-4 py-3 xl:px-0 sm:px-4 px-2 flex items-center justify-between">
        <div class="flex items-center gap-5">
          <div @click="openBurger" id="nav-icon3" class="lg:hidden block" :class="{'open': menu_burger}">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="sm:block hidden">
            <the-logo />
          </div>
          <div class="sm:hidden block w-28" addStyle="w-12" :class="search ? 'hidden' : ''">
            <the-logo />
          </div>
        </div>
        <div class="lg:flex hidden items-center gap-3">
          <div @click="search = !search">
            <header-card addStyle="w-12">
              <the-icon :src="search ? 'x' : 'search'"/>
            </header-card>
          </div>
          <div v-if="!search" class="md:flex hidden" @click="openModalYandexMpas">
            <the-input
              type="text"
              :placeholder="$t('my_place')"
              icon="address"
              :readonly="true"
              inputStyles="cursor-pointer"
              :value="locationName"
            />
          </div>
<!--          <div v-if="!search" class="relative">-->
<!--            <div v-if="modal" class="absolute position z-10 top-12 bg-white p-3 rounded-2xl border border-gray-300 flex flex-col gap-3">-->
<!--              <div class="flex justify-between gap-1">-->
<!--                <h3 class="text-gray-800 font-semibold">{{ $t('you-in') + " " + $store.state.locatinsName | location }}</h3>-->
<!--                <span @click="modal=false"><the-icon width="30px" class="mt-1 mr-1 cursor-pointer flex shrink-0" src="x"></the-icon></span>-->
<!--              </div>-->
<!--              <div class="flex items-center gap-3 mx-auto">-->
<!--                <button @click="locations" class="bg-orange-600 p-3 text-white w-40 rounded-3xl">{{ $t('yes-right') }}</button>-->
<!--                <button @click="openModalYandexMpas" class="bg-gray-300 p-3 text-gray-600 w-40 rounded-3xl">{{ $t('you-wrong') }}</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <input
          v-if="search"
          class="search-input lg:flex hidden"
          type="text"
          placeholder="Search foods"
          @input="goToSearch"
        >
        <ul v-if="!search" class="header-nav lg:flex hidden items-center xl:gap-12 gap-4">
          <li>
            <a href="">{{ $t('our-history') }}</a>
          </li>
          <li>
            <a href="">{{ $t('join') }}</a>
          </li>
          <li>
            <nuxt-link to="/blog">{{ $t('blog') }}</nuxt-link>
          </li>
        </ul>
        <div class="flex items-center xl:gap-4 gap-3">
          <div v-if="!search" class="lg:hidden">
            <div v-if="modal" class="absolute position z-10 top-16 bg-white p-3 rounded-2xl border border-gray-300 flex flex-col gap-3">
              <h3 class="text-gray-800 font-semibold">{{ $t('you-in') + " " + $store.state.locatinsName | location }}</h3>
              <div class="flex items-center gap-3 mx-auto">
                <button @click="locations" class="bg-orange-600 p-3 text-white sm:w-40 w-36 rounded-3xl">{{ $t('yes-right') }}</button>
                <button @click="openModalYandexMpas" class="bg-gray-300 p-3 text-gray-600 sm:w-40 w-36 rounded-3xl">{{ $t('you-wrong') }}</button>
              </div>
            </div>
          </div>
          <div class="lg:hidden flex sm:gap-4 gap-2">
            <input
              v-if="search"
              class="search-input lg:hidden"
              type="text"
              placeholder="Search foods"
              @input="goToSearch"
            >
            <div @click="search = !search">
              <header-card addStyle="w-12">
                <the-icon :src="search ? 'x' : 'search'"/>
              </header-card>
            </div>
          </div>
          <div v-if="!search" @click="modal = true" class="md:hidden sm:flex hidden">
            <header-card>
              <the-icon src="address"/>
            </header-card>
          </div>
          <div v-if="!search" class="lg:hidden md:flex hidden" @click="modal = true">
            <the-input
              type="text"
              placeholder="Можно узнать где ты?"
              icon="address"
              :readonly="true"
              inputStyles="cursor-pointer"
              :value="locationName"
            />
          </div>
          <button v-if="!search" class="sm:flex hidden effect" @click="checkLogin" >
            <header-card  add-style="bg-orange-50">
              <the-icon class="icon-bnt" src="shopping-cart"/>
            </header-card>
          </button>
          <div v-if="!search" class="sm:flex hidden" @click="lang = !lang">
            <header-card add-style="text-gray-800	font-medium relative">
              <span v-if="actionLang && actionLang.name" class="flex shrink-">{{ actionLang.name }}</span>
              <div v-if="lang" @mouseleave="lang = false"
                   class="bg-gray-100 absolute w-40 bg-white cursor-pointer rounded-2xl p-2 top-16 flex flex-col text-center gap-1">
                <span v-if="langList.length"
                  v-for="(item, index) in langList.filter(el=> el.keyword !== $i18n.locale && el.keyword !== 'en')"
                  :key="index"
                  class="w-full hover:bg-white rounded"
                  @click="handleLang(item)">
                  {{ item.name }}
                </span>
              </div>
            </header-card>
          </div>
          <header-card v-if="!search" class="sm:flex hidden">
            <nuxt-link  v-if="$auth.loggedIn" to="profile">
              <the-icon src="user"/>
            </nuxt-link>
            <div v-else @click.stop="$routePush({...$route.query, login: 'login', maps: undefined})">
              <the-icon src="user"/>
            </div>
          </header-card>
        </div>
      </nav>
    </header>

    <!--  Login  -->
    <the-login/>

    <!--  Register  -->
    <the-register/>

    <!--  Order Modal  -->
    <the-modal />
    <the-modal-maps :setOpened="openModalYandexMpas" :isOpened="modal" @changePlice="changePlace"/>
    <burger-menu />
  </div>
</template>

<script>
import HeaderCard from "~/components/header/header-card";
import BurgerMenu from "~/components/header/burger-menu";
import debounce from 'lodash.debounce'
import Login from "@/layouts/login";

export default {
  data() {
    return {
      lang: false,
      modal: false,
      burger: false,
      address: null,
      search: false,
      searchFoods: '',
      langList: [],
      langlot: null,
      locationName: ''
    }
  },
  components: {
    'header-card': HeaderCard,
    'burger-menu': BurgerMenu
  },
  directives: {
    debounce,
  },
  filters: {
    location: function (item) {
      if (item?.length > 60) {
        let result = String(item)
        return result.slice(0, 60) + '...'
      } else {
        return item ?? 'select location'
      }
    }
  },
  computed: {
    menu_burger () {
      return this.$store.state.burger
    },
    actionLang() {
      return this.langList.find((el) => el.keyword === this.$i18n.locale)
    }
  },
  async fetch() {
    await this.getLocales()
  },
  methods: {
   async getLocales () {
      const {data: {results, pagination}} = await this.$axios.get('languages');
     this.langList = results
    },
    showLocations (value) {
      const locations  = {
        latitude: value?.coords?.latitude,
        longitude: value?.coords?.longitude
      };
      const sendata = ""+ locations.latitude + "," +locations.longitude;
      this.$store.dispatch('yandex/pointSearchLotLang',sendata)
        .then(res => {
          if(!res.fullName.length) {
            this.$toast.error('kechirasiz biz Toshkent shaxari boylab hizmat korsatamiz')
          }
          else {
            this.$store.dispatch('set_location_name', res.fullName)
          }
        })
      this.$store.dispatch('set_location', locations)
      this.modal = false;
      // if(this.$route.path === '/') {
      //   window.location.reload()
      // }
    },
    locations () {
      this.modal = false;
      this.$routePush({...this.$route.query,maps: 'maps', login: undefined, register: undefined})
      // window.navigator.geolocation.getCurrentPosition(this.showLocations)
    },
    openModalYandexMpas () {
      this.modal = !this.modal
    },
    changePlace(listPlice) {
      this.address = listPlice.fullName;
      this.locationName = listPlice.fullName
      this.langlot= {
        latitude: listPlice?.getNames[0]?.latitude,
        longitude: listPlice?.getNames[0]?.longitude
      }
      // this.$store.dispatch('set_location', langlot)
      // this.$store.dispatch('set_location_name', listPlice.fullName)
      // window.location.reload()
    },
    async checkLogin () {
      if (this.$auth.state.loggedIn && !this.$route.query.foodSaw) {
      const item = await this.$store.dispatch('cart/getCardList', {
          populate: 'vendor, vendor.user, order_items',
        locale: this.$i18n.locale
        })
        if (item.length && !this.$route.query.foodSaw) {
          this.$routePush({
            ...this.$route.query,
            foodSaw: "multipleOrder",
            login: undefined,
            maps: undefined,
            register: undefined
          })
        }

      } else {
        if (this.$route.query.foodSaw === "multipleOrder" || this.$route.query.foodSaw === 'detailOrder') {
          await this.$routePush({...this.$route.query,maps: undefined, foodSaw: undefined, login: undefined})

        } else {
          await this.$routePush({...this.$route.query, login: 'login',maps: undefined})
        }
      }
    },
  async  handleLang(item) {
try {
  await this.$getLangKeyValues(item)
} catch(err) {
  console.log(err);
}
    },
    openBurger() {
      this.$store.state.burger ? this.$store.dispatch('burgerOpen', false) : this.$store.dispatch('burgerOpen', true)
    },
    goToSearch: debounce(async function (val) {
        try {
          if (val.target.value.length) {
            this.$router.push({
              path: this.localePath('/search'),
              query: {
                search_query: val.target.value
              }
            })
          } else {
            this.$router.back(-1)
          }
        } catch (err) {
        }
      }, 1000),
  }
}
</script>

<style scoped>
.header {
  background: #ffffff;
}

.search-input {
  position: relative;
  z-index: 50;
  height: 48px;
  background: #ffffff;
  border: 1px solid rgb(229,231,235);
  max-width: 800px;
  width: 100%;
  /*left: 58%;*/
  transform: translate(-12px, 0px);
  border-radius: 16px;
  padding: 20px;
  font-size: 18px;
}
.search-input:focus {
  border-color: rgb(234,88,12);
  outline: rgb(234,88,12);
}
.position {
  left: 50%;
  transform: translate(-50%, 0);
}
.header-nav li a {
  position: relative;
}

.header-nav li a:after {
  content: "";
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: -3px;
  width: 0;
  height: 2px;
  border-radius: 24px;
  background: #ea580c;
  transition: ease-in-out .3s;
}

.header-nav li a:hover:after {
  width: 90%;
}

#nav-icon3 {
  width: 34px;
  height: 18px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .3s ease-in-out;
  -moz-transition: .3s ease-in-out;
  -o-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
  cursor: pointer;
}
#nav-icon3 span {
  position: absolute;
  height: 4px;
  width: 100%;
  background: rgb(156 163 175);
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}
#nav-icon3 span:nth-child(1) {
  top: 0px;
}

#nav-icon3 span:nth-child(2),#nav-icon3 span:nth-child(3) {
  top: 8px;
}

#nav-icon3 span:nth-child(4) {
  top: 16px;
}

#nav-icon3.open span:nth-child(1) {
  top: 16px;
  width: 0%;
  left: 50%;
}

#nav-icon3.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon3.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon3.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}
.icon-bnt {
  transition: all 0.8s;
}
.effect:hover .icon-bnt {
  transition: all 0.8s;
  transform: rotate(360deg);
}
@media screen and (max-width: 1300px) {
  .search-input {
    max-width: 700px;
  }
}
@media screen and (max-width: 1160px) {
  .search-input {
    max-width: 600px;
  }
}
@media screen and (max-width: 1060px) {
  .search-input {
    max-width: 500px;
  }
}
@media screen and (max-width: 1024px) {
  .search-input {
    max-width: 100%;
    width: 600px;
    transform: translate(0, 0);
  }
}
@media screen and (max-width: 940px) {
  .search-input {
    width: 400px;
  }
}
@media screen and (max-width: 720px) {
  .search-input {
    width: 330px;
  }
}
@media screen and (max-width: 640px) {
  .search-input {
    width: 450px;
  }
}
@media screen and (max-width: 580px) {
  .search-input {
    width: 375px;
  }
}
@media screen and (max-width: 500px) {
  .search-input {
    width: 325px;
  }
}
@media screen and (max-width: 450px) {
  .search-input {
    width: 275px;
  }
}
@media screen and (max-width: 400px) {
  .search-input {
    width: 225px;
  }
}
@media screen and (max-width: 350px) {
  .search-input {
    width: 200px;
  }
}
</style>
