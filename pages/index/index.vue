<template>
  <div>
    <!-- <Loader :active="pending" /> -->
    <div v-if="pending">
      <div class="main-styles py-4">
        <div class="container mx-auto xl:px-0 px-4 lg:flex hidden scroll-style overflow-x-scroll gap-4">
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="container mx-auto py-6 xl:px-0 px-4 lg:flex hidden scroll-style overflow-x-scroll gap-4">
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="container mx-auto xl:px-0 px-4 lg:flex hidden scroll-style overflow-x-scroll gap-4">
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
          <div role="status"
               class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="main-styles pb-8">

      <!-- Banner -->
      <div class="container mx-auto xl:grid grid-cols-4 gap-2 py-8 hidden">
        <div class="rounded-2xl overflow-hidden h-80">
          <banner-card
            src="https://picsum.photos/300/400"
            add-style="w-full h-full"
            :status="collections[0]?.name"
            status-style="text-green-600 bg-green-50"
          />
        </div>
        <div class="rounded-2xl overflow-hidden h-80 flex flex-col gap-2">
          <div class="grid grid-cols-2 w-full gap-2">
            <div class="rounded-2xl overflow-hidden h-44">
              <banner-card
                src="https://picsum.photos/200/200"
                add-style="w-full h-full"
                :status="collections[1]?.name"
                status-style="text-green-600 bg-green-50"
              />
            </div>
            <div class="rounded-2xl overflow-hidden h-44">
              <banner-card
                src="https://picsum.photos/201/200"
                add-style="w-full h-full"
                :status="collections[1]?.name"
                status-style="text-green-600 bg-green-50"
              />
            </div>
          </div>
          <div class="grid grid-cols-1">
            <banner-card
              src="https://picsum.photos/301/201"
              add-style="w-full h-full"
              :status="collections[0]?.name"
              status-style="text-green-600 bg-green-50"
            />
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden h-80">
          <banner-card
            src="https://picsum.photos/302/402"
            add-style="w-full h-full"
            :status="collections[0]?.name"
            status-style="text-green-600 bg-green-50"
          />
        </div>
        <div class="rounded-2xl overflow-hidden h-80 flex flex-col gap-2">
          <div class="grid grid-cols-1">
            <banner-card
              src="https://picsum.photos/302/203"
              add-style="w-full h-44"
              :status="collections[0]?.name"
              status-style="text-green-600 bg-green-50"
            />
          </div>
          <div class="grid grid-cols-1">
            <banner-card
              src="https://picsum.photos/301/201"
              add-style="w-full h-full"
              :status="collections[0]?.name"
              status-style="text-green-600 bg-green-50"
            />
          </div>
        </div>
      </div>
      <div class="xl:hidden container mx-auto overflow-x-scroll sm:py-6 py-2 xl:px-0 sm:px-4 px-2 scroll-style">
        <div class="flex items-center sm:gap-4 gap-2 w-full">
          <banner-card
            v-for="item in collections"
            :key="item.id"
            :src="item?.banner?.url"
            :status="item.name"
            status-style="text-green-600 bg-green-50"
            add-style="rwd-card flex shrink-0"
          />
        </div>
      </div>
      <!-- Banner end -->

      <!--  Menu section  -->
      <div class="container mx-auto xl:px-0 sm:px-4 px-2 sm:py-8 py-4">
        <div class="flex items-center justify-between">
          <h2 id="menu" class="text-3xl font-semibold text-gray-800">
            <a href="#menu">{{ $t('menu') }}</a>
          </h2>
          <div class="flex items-center gap-1">
            <!--            <span class="font-normal text-orange-600 cursor-pointer">{{ $t('see-more') }}</span>-->
            <!--            <the-icon src="right-arrow" />-->
          </div>
        </div>
      </div>
      <!--      <div class="container mx-auto overflow-x-scroll scroll-style xl:px-0 sm:px-4 px-2">-->
      <!--        <div class="flex items-center sm:gap-3.5 gap-2">-->
      <!--          <div v-for="item in $store.state.days_list">-->
      <!--            <menu-card-->
      <!--              :date="item"-->
      <!--              :month="item.month"-->
      <!--              @onDates="onDatesFilter"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
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

      <div class="container mx-auto xl:px-0 sm:px-4 px-2">
        <div class="flex flex-wrap justify-center items-center sm:gap-4 gap-2 w-full">
          <!--          <Loader :active="loading" />-->
          <div v-if="loading">
            <div class="main-styles py-4">
              <div class="container mx-auto xl:px-0 px-4 lg:flex hidden scroll-style overflow-x-scroll gap-4" v-for="(item , index) in pagination.pageSize/4" :key="index">
                <div role="status"
                     class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                  <span class="sr-only">Loading...</span>
                </div>
                <div role="status"
                     class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                  <span class="sr-only">Loading...</span>
                </div>
                <div role="status"
                     class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                  <span class="sr-only">Loading...</span>
                </div>
                <div role="status"
                     class="flex items-center justify-center h-56 w-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
          <VendorCard
            v-for="(item, idx) in vendorData"
            :key="idx"
            :id="item.id"
            :src="'backgraund'"
            :title="item?.user?.first_name + ' ' + item?.user?.last_name"
            :product-img="item?.background"
            :avatar="item?.user?.avatar?.aws_path"
            :rate="item?.rating ?? 4.3"
            :deliveryPrice="item?.delivery_price ?? 10000 +'+'"
            :count="idx + 1"
          />
        </div>
      </div>

      <button v-if="Number(pagination.pageSize) < Number(total)" :disabled="isPageCount" @click="pageCount"
              class="mx-auto mt-3 block py-2 bg-white rounded-lg text-center cursor-pointer sm:w-96 w-72"
              :class="{'px-8 py-3bg-gray-300 text-white rounded focus:outline-none':isPageCount}"
      >
        <span class="text-sm text-gray-700">{{ $t('see-more') }}</span>
      </button>

      <!--  Blog section  -->
      <div class="container mx-auto xl:px-0 sm:px-4 px-2 sm:py-6 py-5">
        <div class="flex items-center justify-between">
          <h2 id="blog" class="text-3xl font-semibold text-gray-800">
            <a href="#menu">{{ $t('blog') }}</a>
          </h2>
          <div class="flex items-center gap-1">
            <nuxt-link class="font-normal text-orange-600 cursor-pointer" to="/blog">{{ $t('see-more') }}</nuxt-link>
            <the-icon src="right-arrow"/>
          </div>
        </div>
      </div>
      <div class="container mx-auto overflow-x-scroll scroll-style px-2">
        <div class="flex items-center gap-3.5">
          <div v-for="item in blogCard" :key="item.id">
            <blog-card
              :title="`${item?.vendor?.user?.first_name}' ' ${item?.vendor?.user?.last_name}`"
              :avatar="item?.vendor?.user.avatar?.aws_path"
              :src="item?.image?.aws_path"
            />
          </div>
        </div>
      </div>

      <!--      <Loader :active="$store.state.loader" />-->
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  auth: false,
  data() {
    return {
      weekdays: {
        '0': 7,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6
      },
      location: false,
      more: false,
      pending: false,
      loading: false,
      menuCard: [],
      vendorData: null,
      isPageCount: false,
      page: 2,
      locations: null,
      blogCard: [],
      categories: [],
      vendors: [],
      collections: [],
      renderCount: 0,
      limit: 8,
      total: 8,
      pagination: {
        page: 1,
        pageSize: 8
      },
    }
  },
  watch: {
    '$route.query.category_id': function (val) {
      this.getVendors()
    },
    '$route.query.lat': function (val) {
      this.getVendors()
    },
  },
  async fetch() {
    try {
      await this.getCollection()
      await this.getCategories()
      await this.getDate()
      await this.getVendors()
      await this.getReels()
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {
    async getCategories() {
      try {
        const {data: {results, pagination}} = await this.$axios.get('categories', {
          params: {
            populate: '*',
            locale: this.$i18n.locale
          }
        })
        this.categories = results;
        this.categories.unshift(this.$i18n.locale === 'uz' ? {name: 'Hammasi', id: 'all'} : {name: 'Все', id: 'all'})

      } catch (err) {
        throw new Error(err)
      }
    },
    async getCollection() {
      try {
        this.pending = true
        const {data: {results, pagination}} = await this.$axios.get('service-collections', {
          locale: this.$i18n.locale
        })
        this.collections = results
      } catch (err) {
        return err
      }
    },
    async getVendors() {
      try {
        const _query = {...this.$route.query}
        this.loading = true
        const {data: {results, pagination}} = await this.$axios.get('vendors/all', {
          params: {
            populate: "passport, patent, background, user, user.avatar, working_days, *",
            locale: this.$i18n.locale,
            pagination: this.pagination,
            lat: this.$route.query.lat ?? undefined,
            long: this.$route.query.long ?? undefined,
            filters: {
              categories: {
                id: {
                  $eq: _query.category_id
                }
              },
              verified: {$eq: true},
              working_days: (this.weekdays[this.$dayjs(new Date()).day()])
            }
          }
        });
        this.vendorData = results
        this.loading = false
        this.total = pagination.total;
      } catch (err) {
        this.loading = false
        throw new Error(err)
      }
    },
    async getReels() {
      try {
        const {data: {results, pagination}} = await this.$axios.get('reels', {
          params: {
            populate: 'image, vendor, background, vendor.user, vendor.background, vendor.user.avatar',
            locale: this.$i18n.locale
          }
        });
        this.blogCard = results
      } catch (err) {
        throw new Error(err)
      }
    },
    async onDatesFilter(item) {
      // this.$routePush({...this.$route.query, day: item.day})
      // this.getVendors()
    },
    async getDate() {
      return this.$store.dispatch('set_day').then(res => this.pending = false)
    },
    categoriesFilter(item) {
     this.pagination = {
       page: 1,
       pageSize: 8
     }
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
          await this.getVendors()
          this.isPageCount = false;
        } else {
          this.isPageCount = true
        }
      } catch (err) {
        throw new Error(err)
      }

    }

  },
  computed: {
    ...mapGetters(['get_days_list']),
  },
  mounted() {
    // console.log(this.$dayjs(new Date()).day())
    this.location = true;
    this.$bridge.$on('vendor_fetch', async (message) => {
      this.locations = message;
      console.log(message)
      // await this.getVendors()

    })
  }
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

.card-1 {
  width: 312px;
  height: 330px;
}

.card-2 {
  width: 384px;
  height: 154px;
}

.card-3 {
  width: 488px;
  height: 154px;
}

.card-4 {
  width: 472px;
  height: 160px;
}

.card-5 {
  width: 400px;
  height: 160px;
}

.rwd-card {
  width: 320px;
  height: 180px;
}

.main-styles {
  background: #F3F4F6;
}

@media screen and (max-width: 1280px) {
  .card-1 {
    width: 280px;
    height: 330px;
  }

  .card-2 {
    width: 360px;
    height: 154px;
  }

  .card-3 {
    width: 460px;
    height: 154px;
  }

  .card-4 {
    width: 450px;
    height: 160px;
  }

  .card-5 {
    width: 370px;
    height: 160px;
  }
}

@media screen and (max-width: 1150px) {
  .card-2 {
    width: 340px;
    height: 154px;
  }

  .card-3 {
    width: 440px;
    height: 154px;
  }

  .card-4 {
    width: 430px;
    height: 160px;
  }

  .card-5 {
    width: 350px;
    height: 160px;
  }
}

@media screen and (max-width: 1100px) {
  .card-2 {
    width: 330px;
    height: 154px;
  }

  .card-3 {
    width: 430px;
    height: 154px;
  }

  .card-4 {
    width: 420px;
    height: 160px;
  }

  .card-5 {
    width: 340px;
    height: 160px;
  }
}

@media screen and (max-width: 1080px) {
  .card-2 {
    width: 325px;
    height: 154px;
  }

  .card-3 {
    width: 415px;
    height: 154px;
  }

  .card-4 {
    width: 405px;
    height: 160px;
  }

  .card-5 {
    width: 325px;
    height: 160px;
  }
}

@media screen and (max-width: 1050px) {
  .card-2 {
    width: 315px;
    height: 154px;
  }

  .card-3 {
    width: 400px;
    height: 154px;
  }

  .card-4 {
    width: 390px;
    height: 160px;
  }

  .card-5 {
    width: 315px;
    height: 160px;
  }
}

@media screen and (max-width: 500px) {
  .rwd-card {
    width: 280px;
    height: 160px;
  }
}
</style>
