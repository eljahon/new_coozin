<template>
  <div>
<!--    <client-only>-->

    <div id="map-wrap" style="height:40vh" class="w-full h-1/2">
<!--      <no-ssr>-->
        <yandex-map
          v-if="showMap"
          style="height: 100% !important; width: 100% !important;"
          :settings="setting"
          :coords="markerIcon"
          :zoom="11"
          class="yandexMap"

          map-type="map"
          @click="Location"
          :controls="[]"
        >
          <ymap-marker
            :coords="markerIcon"
            :marker-id="1"
          >
          </ymap-marker>
        </yandex-map>
    </div>
<!--    </client-only>-->
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
export default {
  name: "yandex.map",
  props: {
    markerIcon: {
      type: Array,
      default: () => [41.30189519574488,69.28935242760551]
    },
    isVendor: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    ymapMarker,
    yandexMap
  },
  data () {
    return {
      showMap: false,
      setting: {
        apiKey: '1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e',
        // apiKey: '8fb635ed-f033-4166-8286-a5388bb7d9a9',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      }
    }
  },
  mounted() {
    setTimeout(() =>{
      this.showMap = true;
    } , 0)
  },
  methods: {
   async Location(name) {
     try {
       const sendata = name._sourceEvent._cache.coords.join(',')
      const data=  await  this.$store.dispatch('yandex/pointSearchLotLang', sendata);
       this.$emit('clickPlace', data)
     } catch (err){
     }
    }
  }
}
</script>

<style scoped>

</style>


