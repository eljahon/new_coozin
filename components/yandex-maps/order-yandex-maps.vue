
<template>
  <div v-if="isMaps">
    <div class="multiple-modal 1">
      <span class="flex flex-col mb-2">
        <div class="flex items-center justify-between mb-3">
          <h2>{{$t('delivery-address')}}</h2>
          <span @click="setIsMaps">
            <the-icon
              class="cursor-pointer"
              src="x"
              width="20"
              height="20"
            />
          </span>
        </div>
        <div class="flex items-center justify-between gap-3">
          <button @click="myLocations"
                  class="sm:flex text-sm hidden text-white p-1 rounded-2xl bg-orange-500">{{$t('my-address')}}</button>
          <div class="w-3/4 m-auto">
            <input
              class="w-full p-2 rounded-2xl bg-white outline-orange-500 border border-gray-200"
              type="text"
              autocomplete="on"
              @input="getSearchName"
              placeholder="Выбирайте или найдите свой локация"
              v-model="search"
            >
             <ul class="fixed z-10 bg-white p-4" v-if="searchList.length">
              <button @click="close" class="float-right mt-2 mr-1">
                <the-icon

                  class="cursor-pointer "
                  src="x"
                  width="10"
                  height="10"
                />
              </button> <br>
            <li class="hover:bg-orange-500 hover:text-white hover:rounded p-3" v-for="(item, index) in searchList"
                :key="index" @click="searchNameSelect(item)">{{ item.name }}</li>
            </ul>

          </div>

          <button
            @click="closedMap"
            class="text-white p-2 px-4 rounded-2xl bg-orange-500"
          >
            {{$t('OK')}}
          </button>
        </div>
      </span>
      <yandex-maps @clickPlace="locationNames" :marker-icon="markerIcon"></yandex-maps>
    </div>
    <div class="modal-background 1"
         @click="setIsMaps">
    </div>
  </div>
</template>

<script>
import yandexMaps from "@/components/yandex-maps/yandex-maps";
import debounce from 'lodash.debounce'
export default {
  name: "TheMaps",
  directives: {
    debounce,
  },
  props: ['isMaps', 'setIsMaps'],
  data() {
    return {
      search: '',
      isMapRender: false,
      markerIcon: [41.30189519574488, 69.28935242760551],
      searchList: [],
      selectPlaceName: null
    }
  },
  components: {
    yandexMaps
  },
  methods: {
    async locationNames(selectPlaceNames) {
      this.markerIcon = [selectPlaceNames.getNames[0]?.latitude, selectPlaceNames.getNames[0]?.longitude]
      const {fullName} = selectPlaceNames;
      this.search = fullName
      this.selectPlaceName = selectPlaceNames
      // await this.$emit('changePlice', selectPlaceNames)

    },
    myLocations() {
      this.locations()
    },
    async showLocations(value) {
      const locations = {
        latitude: value?.coords?.latitude,
        longitude: value?.coords?.longitude
      };
      this.markerIcon = [locations.latitude, locations.longitude]
      const sendata = this.markerIcon.join(',')
      const data = await this.$store.dispatch('yandex/pointSearchLotLang', sendata);
      this.search = data.fullName;
      this.locationNames(data)
    },
    locations() {
      window.navigator.geolocation.getCurrentPosition(this.showLocations)
    },
    getSearchName: debounce(async function (val) {
      try {
        if (val.target.value.length) {
          const getdata = await this.$store.dispatch('yandex/pointSearch', val.target.value);
          this.searchList = getdata;
        }
      } catch (err) {
      }
    }, 1000),
    searchNameSelect(item) {
      this.search = item.name;
      this.markerIcon = [item.location[1], item.location[0]];
      this.searchList = [];
    },
    async  closedMap() {
       await this.$emit('changePlice', this.selectPlaceName)
       this.$routePush({...this.$route.query, orderMap: undefined})
    },
    close () {
      this.searchList = []
    }
  },
}
</script>
<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: #111827;
  opacity: 0.3;
}

.multiple-modal {
  width: 600px;
  position: fixed;
  z-index: 5;
  padding: 16px;
  border-radius: 16px;
  top: 14%;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  background: #ffffff;
}

.multiple-modal > div {
  overflow: hidden;
  height: 86%;
}

.ymaps-2-1-79-map {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 600px) {
  .multiple-modal {
    width: 96%;
  }
}

</style>
