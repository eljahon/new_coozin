<template>
<div>
  <component :is="statusList[status]" :order-item="orderItem"/>
</div>
</template>
<script>
import pending from './pending'
import defaultd from './default'
export default {
  name: "isRendorStatus",
  props: ['orderItem', 'status'],
  data () {
    return {
      statusList: {
        'default': defaultd,
        'pending': pending
      }
    }
  }
}
</script>

<style scoped>

</style>
