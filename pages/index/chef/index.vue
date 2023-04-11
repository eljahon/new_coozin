<template>
  <div class="main-styles pb-8">
    <div class="container mx-auto">
      <div class="banner">
        <div class="banner__item flex items-center sm:gap-4 gap-2 pl-7">
          <div class="avatar-styles">
            <img v-if="itemVendor?.user && itemVendor?.user?.avatar && itemVendor?.user?.avatar?.aws_path"
                 class="w-full fit-cover" :src="imageSee(itemVendor.user.avatar.aws_path)"
                 alt="Avatar Chef">
            <img class="w-full fit-cover" :src="img"
                 alt="Avatar Chef">
          </div>
          <div class="flex flex-col md:gap-8 sm:gap-4 gap-2 w-full">
            <div class="flex sm:gap-4 gap-3">
              <div class="flex items-center gap-2 md:px-4 px-3 bg-white rounded-full">
                <the-icon class="md:block hidden" src="rate" width="20" height="20"/>
                <the-icon class="md:hidden block" src="rate" width="16" height="16"/>
                <span class="text-gray-800 md:text-xl sm:text-lg text-base">{{
                    itemVendor?.ratings_avg ? itemVendor.ratings_avg : '0'
                  }}</span>
              </div>

              <button v-if="$auth.loggedIn && isFollow"
                      @click="unFollowPatch"
                      class="flex items-center justify-center gap-2 md:py-2 md:px-5 px-3 bg-white rounded-full cursor-pointer">
                <the-icon src="chef" width="16" height="16"/>
                <span
                  class="text-gray-800 md:text-xl sm:text-lg text-base text-gray-800 font-medium">{{
                    $t('you-subscribed')
                  }}</span>
              </button>
              <button v-else
                      @click="followPatch"
                      class="flex items-center justify-center gap-2 md:py-2 py-1 px-5 bg-white rounded-full cursor-pointer">
                <the-icon src="chef-hat" width="16" height="16"/>
                <span
                  class="text-gray-800 md:text-xl sm:text-lg text-base text-gray-800 font-medium">{{
                    $t('subscribe')
                  }}</span>
              </button>
              <div class="flex items-center gap-2 md:px-4 px-3 bg-white rounded-full">
                <img width="16" height="16" src="~/assets/svg/car.svg" alt="Car icon">
                <span class="text-gray-800 md:text-xl sm:text-lg text-base">{{
                    itemVendor?.delever_price ? itemVendor.delever_price : '10000+'
                  }}{{ $t('sum') }}</span>
              </div>
            </div>
            <div
              class="flex lg:flex-row flex-col lg:gap-0 lg:items-center lg:justify-between xl:px-0 lg:gap-0 sm:gap-6 gap-4">
              <div class="flex items-center sm:gap-5 gap-2">
                <h2 v-if="itemVendor && itemVendor?.user && itemVendor?.user?.first_name"
                    class="md:text-2xl sm:text-xl text-sm text-gray-800 font-semibold	items-center">
                  {{ itemVendor.user.first_name + " " + itemVendor.user.last_name }}</h2>
                <h2 v-else class="md:text-2xl sm:text-xl text-sm text-gray-800 font-semibold	items-center">
                  {{ 'No name' }}</h2>
                <the-icon class="md:block hidden" src="information-circle"/>
                <the-icon class="md:hidden block" width="22" src="information-circle"/>
                <the-icon class="cursor-pointer md:block hidden" src="share"/>
                <the-icon class="cursor-pointer md:hidden block" width="22" src="share"/>
              </div>
              <div class="switch switch-additinal" @click="switchOn = !switchOn">
                <div class="switch-item delay-300"
                     :class="{ 'switch-right': switchOn, 'switch-left': !switchOn }"></div>
                <div>
                  <span :class="{'text-orange-600': !switchOn, 'text-gray-500': switchOn}">Меню</span>
                </div>
                <div>
                  <span :class="{'text-orange-600': switchOn, 'text-gray-500': !switchOn}">Лента</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto xl:px-0 sm:px-4 px-3">
      <div class="switch switch-rwd" @click="switchOn = !switchOn">
        <div class="switch-item delay-300"
             :class="{ 'switch-right': switchOn, 'switch-left': !switchOn }"></div>
        <div>
          <span :class="{'text-orange-600': !switchOn, 'text-gray-500': switchOn}">{{ $t('menu') }}</span>
        </div>
        <div>
          <span :class="{'text-orange-600': switchOn, 'text-gray-500': !switchOn}">Лента</span>
        </div>
      </div>
    </div>
    <div class="container mx-auto overflow-x-scroll scroll-style my-3 xl:px-0 sm:px-4 px-2">
      <div class="flex items-center sm:gap-4 gap-2 w-full">
        <category-card
          v-for="item in categories"
          :key="item.id"
          :title="item.name"
          :id="item.id"
          @clickCategories="categoriesFilter"
        />
      </div>
    </div>
    <loading-cart-loading v-if="$fetchState.pending || loading"/>
    <div v-if="!switchOn">
      <div class="container mx-auto xl:px-0 sm:px-4 px-2">
        <div class="flex flex-wrap justify-center items-center sm:gap-4 gap-2 w-full">
          <div v-for="(item, idx) in foods" :key="idx" @click="showFood(item)">
            <chef-product-card
              :src="item.media[0]?.aws_path"
              :title="item.name"
              :price="item.price"
              :delay="item.preparation_time"
              :item="item"
            />
          </div>
        </div>
        <button v-if="pagination.pageSize < total" :disabled="isPageCount" @click="pageCount"
                class="mx-auto mt-3 block py-2 bg-white rounded-lg text-center cursor-pointer sm:w-96 w-72"
                :class="{'px-8 py-3bg-gray-300 text-white rounded focus:outline-none':isPageCount}"
        >
          <span class="text-sm text-gray-700">{{ $t('see-more') }}</span>
        </button>
        <br>
        <!--        <yandex-maps v-if="coor[0] !== null " :marker-icon="coor"/>-->
        <div style="height: 30%">
          <yandex-maps />
        </div>
      </div>

      <!--      <div class="container mx-auto overflow-x-scroll scroll-style my-7">-->
      <!--        <div class="flex items-center gap-4 w-full">-->
      <!--          <chef-product-card v-for="(item, idx) in productData" :key="idx" :src="item.src" :title="item.title"-->
      <!--                             :price="item.price" :delay="item.delay"/>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div v-if="more" class="container mx-auto overflow-x-scroll scroll-style my-7">-->
      <!--        <div class="flex items-center gap-4 w-full">-->
      <!--          <chef-product-card v-for="(item, idx) in productData" :key="idx" :src="item.src" :title="item.title"-->
      <!--                             :price="item.price" :delay="item.delay"/>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <!--    <div v-if="switchOn">-->
    <!--      <div class="container mx-auto flex flex-wrap items-center justify-center gap-3 mb-7">-->
    <!--        <div v-if="vendor?.reels[0]?.length > 0 && vendor.reels[0]?.media[0]?.length > 0">-->
    <!--          <div v-for="(item, idx) in vendor.reels[0].media" :key="item.id ? item.id : idx">-->
    <!--            <div class="blog-img">-->
    <!--              <img class="w-full object-cover" :src="item.url" :alt="item.title">-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div-->
    <!--      v-if="vendor?.reels[0]?.length > 0 && vendor.reels[0]?.media[0]?.length > 0 && !more"-->
    <!--      @click="more = true"-->
    <!--      style="width: 384px;"-->
    <!--      class="mx-auto py-2 bg-white rounded-lg text-center cursor-pointer"-->
    <!--    >-->
    <!--      <span class="text-sm text-gray-700">Показать больше</span>-->
    <!--    </div>-->
    <the-food
      v-if="isFood"
      :item="foodDetail"
      :user="itemVendor"
      :isSee="isShowFood">

    </the-food>
  </div>
</template>;

<script>
import yandexMaps from "~/components/yandex-maps/yandex-maps";
import img from '~/assets/img/vendor.png'

export default {
  auth: false,
  components: {
    yandexMaps
  },
  data() {
    return {
      img: img,
      isFood: false,
      switchOn: false,
      more: false,
      foodModal: false,
      categories: null,
      total: null,
      foodDetail: {},
      loading: false,
      coor: [],
      productData: [],
      isPageCount: false,
      pagination: {
        page: 1,
        pageSize: 8,
      },
      blogCard: [],
      itemVendor: {},
      foods: [],
      isFollow: false
    }
  },
  watch: {
    '$auth.loggedIn': function (val) {
      if (val) this.$fetch()
    },
    '$route.query.category_id': function (val) {
      this.getFood()
    },
    '$route.query': function (val) {
      this.isFood = false
    }
  },
  async fetch() {
    try {
      await this.getItem()
      if (this.$auth.loggedIn) {
        await this.getChekfollow()
      }
      await this.getCategories()
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {
    async getChekfollow() {
      try {
        const {data} = await this.$axios.get('is_followed', {
          params: {
            vendor: this.$route.query.vendor_id
          }
        })
        this.isFollow = data;
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
    async followPatch() {
      try {
        if (this.$auth.loggedIn) {
          const {data} = await this.$axios.patch(`follow/vendor/${this.$route.query.vendor_id}`)
          if (data.status) {
            this.$toast.success(data.status)
            this.getChekfollow()
          }
        } else {
          this.$toast.info(this.$t('system-login'))
        }
      } catch (err) {
        throw new Error(err)
      }

    },
    async unFollowPatch() {
      try {
        if (this.$auth.loggedIn) {
          const {data} = await this.$axios.patch(`unfollow/vendor/${this.$route.query.vendor_id}`)
          if (data.status) {
            this.$toast.success(data.status)
            await this.getChekfollow()

          }
        } else {
          this.$toast.info(this.$t('system-login'))
        }

      } catch (err) {
      }

    },
    showFood(item) {
      this.isShowFood()
      this.foodDetail = item;
    },
    isShowFood() {
      this.isFood = !this.isFood
    },
    async getFood() {
      try {
        this.loading = true
        const _params = {...this.$route.query}
        const {data: {results, pagination}} = await this.$axios.get('products', {
          params: {
            // limit: 10,
            locale: this.$i18n.locale,
            populate: '*',
            pagination: this.pagination,
            filters: {
              vendor: {
                id: {
                  $eq: _params.vendor_id
                }
              },
              category: {
                id: {
                  $eq: _params.category_id ?? undefined
                }
              }
            }
          }
        });
        if (results.length === 0) {
          this.$toast.info(this.$t('food-is-not'))
        }
        this.foods = results;
        this.total = pagination.total;
        this.loading = false;
        return results;
      } catch (err) {
        this.loading = false;
        throw new Error(err)
      }
    },
    async getItem() {
      try {
        const {data} = await this.$axios.get(`vendors/${this.$route.query.vendor_id}`, {
          params: {
            populate: "passport, patent, background, user, user.avatar, *",
            locale: this.$i18n.locale,
          }
        })
        this.itemVendor = data;
        this.coor = [data.location.lat, data.location.long]

        await this.getFood()
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
    imageSee(item) {
      return this.$img + item
    },
    async getCategories() {
      try {
        const {data: {results}} = await this.$axios.get('categories', {
          params: {
            populate: '*',
            locale: this.$i18n.locale
          }
        });
        this.categories = results;
        this.categories.unshift({name: this.$t('all'), id: 'all'})
      } catch (err) {
        throw new Error(err)
      }
    },
    categoriesFilter(item) {
      if (item.category_id === 'all') {
        this.$routePush({...this.$route.query, category_id: undefined})
      } else {
        this.$routePush({...this.$route.query, category_id: item.category_id});
      }

    },
    async pageCount() {
      try {
        if (this.pagination.pageSize < this.total) {
          this.isPageCount = true;
          this.pagination.pageSize += 4
          await this.getFood()
          this.isPageCount = false;
        } else {
          this.isPageCount = true
        }
      } catch (err) {
        throw new Error(err)
      }
    },

  },
  computed: {
    // isFollow() {
    //   return false
    // }
  },
  // mounted() {
  //   this.$bridge.$on('chef_to_get', async () => await this.getAllRequest())
  // }
}
</script>

<style scoped>
.scroll-style::-webkit-scrollbar {
  height: 0;
  border-radius: 24px;
}

.scroll-style::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scroll-style::-webkit-scrollbar-thumb {
  background: #888;
}

.scroll-style::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.banner {
  background: url("../../../assets/img/img-4.jpg") no-repeat;
  background-size: cover;
  height: 214px;
  margin-bottom: 116px;
}

.banner .banner__item {
  transform: translate(0, 125px);
}

.main-styles {
  background: #F3F4F6;
}

.avatar-styles {
  width: 180px;
  height: 180px;
  border: 4px solid #EFEFEF;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
}

.switch {
  position: relative;
  background: #FFFFFF;
  border-radius: 24px;
  width: 368px;
  height: 40px;
  display: flex;
  cursor: pointer;
}

.switch span {
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  z-index: 4;
}

.switch > div {
  width: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch-item {
  width: 188px;
  height: 32px;
  background: #FFEEE3;
  border-radius: 24px;
  transition: ease-in-out .3s;
}

.switch-left {
  position: absolute;
  top: 4px;
  left: 4px;
  transition: ease-in-out .3s;
}

.switch-right {
  position: absolute;
  right: 4px !important;
  top: 4px;
  transition: ease-in-out .3s;
}

.blog-img {
  width: 296px;
  height: 296px;
  border: 2px solid #F3F4F6;
  border-radius: 8px;
  overflow: hidden;
}

.switch-rwd {
  display: none;
}

@media screen and (max-width: 1024px) {
  .banner .banner__item {
    transform: translate(0, 140px);
  }
}

@media screen and (max-width: 768px) {
  .banner .banner__item {
    transform: translate(0, 150px);
  }
}

@media screen and (max-width: 640px) {
  .product-card {
    height: 260px;
  }

  .banner .banner__item {
    transform: translate(0, 170px);
  }

  .avatar-styles {
    width: 120px;
    height: 120px;
  }

  .switch {
    width: 350px;
  }
}

@media screen and (max-width: 540px) {
  .switch-additinal {
    display: none;
  }

  .banner .banner__item {
    transform: translate(0, 150px);
  }

  .switch-rwd {
    display: flex;
    width: 90%;
    margin: 0 auto;
  }

  .banner {
    margin-bottom: 80px;
  }
}

@media screen and (max-width: 450px) {
  .avatar-styles {
    width: 95px;
    height: 95px;
  }

  .banner .banner__item {
    transform: translate(0, 160px);
    padding: 0 12px;
  }
}

@media screen and (max-width: 400px) {
  .avatar-styles {
    width: 85px;
    height: 85px;
  }

  .banner {
    margin-bottom: 55px;
  }

  .banner .banner__item {
    transform: translate(0, 167px);
    padding: 0 12px;
  }
}
</style>
