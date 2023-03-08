<template>
  <div>
    <Loader :active="$fetchState.pending || loading" />
    <div class="bg-gray-100">
      <div class="container mx-auto my-3 xl:px-0 sm:px-4 px-2 py-3">
        <div class="flex flex-wrap items-center sm:gap-4 gap-2 w-full">
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
            <button :disabled="isPageCount" @click="pageCount"
                    class="mx-auto mt-3 block py-2 bg-white rounded-lg text-center cursor-pointer sm:w-96 w-72"
                    :class="{'px-8 py-3bg-gray-300 text-white rounded focus:outline-none':isPageCount}"
            >
              <span class="text-sm text-gray-700">{{ $t('see-more') }}</span>
            </button>
            <br>
            <!--        <yandex-maps v-if="coor[0] !== null " :marker-icon="coor"/>-->
            <yandex-maps/>
          </div>
<!--          <div v-for="(item, idx) in $store.state.foods.foods" :key="idx" @click="showFood(item)">-->
<!--&lt;!&ndash;            <chef-product-card&ndash;&gt;-->
<!--&lt;!&ndash;              :src="item.src"&ndash;&gt;-->
<!--&lt;!&ndash;              :title="item.name"&ndash;&gt;-->
<!--&lt;!&ndash;              :price="item.price"&ndash;&gt;-->
<!--&lt;!&ndash;              :delay="item.preparation_time"&ndash;&gt;-->
<!--&lt;!&ndash;              :item="item"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--          </div>-->
        </div>
        <button :disabled="isPageCount" @click="pageCount" class="mx-auto block py-2 bg-white rounded-lg text-center cursor-pointer sm:w-96 w-72">
          <span class="text-sm text-gray-700">{{ $t('see-more') }}</span>
        </button>
      </div>
<!--      <the-food :item="foodDetail" ></the-food>-->
      <the-food
        v-if="isFood"
        :item="foodDetail"
        :user="itemVendor"
        :isSee="isShowFood">

      </the-food>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  name: "",
  data() {
    return {
      isPageCount: false,
      foodDetail: null,
      categories: [],
      foods: [],
      isFood: false,
      itemVendor: null,
      total: null,
      coor: [],
      loading: false,
      pagination: {
        page: 1,
        pageSize: 8
      },
    }
  },
  async fetch() {
    try {
      await this.getCategories()
      await this.getFoods()
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {
    isShowFood() {
      this.isFood = !this.isFood
    },
    async getItem(id) {
      try {
        const {data} = await this.$axios.get(`vendors/${id}`, {
          params: {
            populate: "passport, patent, background, user, user.avatar, *",
            locale: this.$i18n.locale,
          }
        })

        this.itemVendor = data;
        this.coor = [data.location.lat, data.location.long]

        // await this.getFood()
        return data
      } catch (err) {
        throw new Error(err)
      }
    },
    async showFood (item) {
             this.foodDetail = item;
            await this.getItem(item.vendor.id)
            this.isShowFood()
    },
     categoriesFilter (item) {
      // console.log(item)
      this.getFoods(item.category_id)
    },
    async getFoods(id) {
      try {
        this.loading = true;
       const {data:{results, pagination}} = await this.$axios.get('products', {
         params: {
           populate: "*",
           pagination: this.pagination,
           filters: {
             category: {
               id: {
                 $eq: id !== 'all' ? id : undefined
               }
             },
             name: {
               $eq: this.$route.query.search_query
             }
           }
         }
       })
        this.loading = false;
        this.foods = results;
        // console.log(results)
      } catch (e) {
        throw new Error(e)
      }
    },
    async getCategories(){
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
    async pageCount () {
      this.isPageCount = true;
      this.pagination.pageSize+=4;
      await this.getFoods()
      await this.page++
      this.isPageCount = false;
    }
  },
  watch: {
    '$route.query.search_query': function () {
      this.getFoods()
    }
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
