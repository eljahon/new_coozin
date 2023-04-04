<template>
  <div
    @click="onClick"
    class="group flex flex-col items-center justify-center
    w-40 p-2 rounded-lg bg-gray-200 border
    active:border-orange-600 hover:border-orange-600
    hover:bg-white cursor-pointer"
    :class="{ 'w-10 h-14': variant, 'pointer-events-none bg-gray-100':isWorkDay }"
  >
    <span
      class="font-semibold leading-5 text-xl text-gray-600 group-active:text-orange-600 group-hover:text-orange-600"
      :class="{ 'text-xs leading-4': variant, 'text-gray-300': isWorkDay }"
    >
      {{date.seeDate}}
    </span>
      <span
        class="font-semibold leading-5 text-sm text-gray-600 group-active:text-orange-600 group-hover:text-orange-600"
        :class="{ 'text-xs leading-4': variant, 'text-gray-300': isWorkDay }"
      >
      {{ date.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['date', 'month', 'variant', 'isWorkDay'],
  data ()  {
    return {
      monthNames: {
        "01": 'Yan',
        "02": 'Fer',
        "03": 'Mar',
        "04": 'Apr',
        "06": 'May',
        "07": 'Inl',
        "08": 'Inn',
        "09": 'Avg',
        "10": 'Sen',
        "11": 'Okt',
        "12": 'Dec',
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('onDates', {day: this.date.date})
    },
  }

}
</script>

<style scoped></style>
