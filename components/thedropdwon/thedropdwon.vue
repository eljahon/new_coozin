<template>
  <div class="relative w-full" @click.stop="isOpen = !isOpen">
    <button @click.stop="isOpen = !isOpen" @blur="clickBlures"
            :class="errors ? 'border-red-500 border-2' : ''"
            class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4
               py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
      <span v-if="selectedOption.label">{{ selectedOption.label }}</span>
      <span v-else class="text-slate-400">{{ placeholder }}</span>
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M10.293 14.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 11.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4z"
              clip-rule="evenodd"/>
      </svg>
    </button>
    <div v-if="isOpen" class="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg " @mousedown.prevent>
      <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3"
          class="max-h-60 rounded-md py-1 scroll-style text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <li v-for="(option, index) in options" :key="index" @click.stop="selectOption(option)"
            :class="{ 'text-white bg-orange-500': selectedOption.value === option.value, 'text-gray-900': !(selectedOption.value === option.value) }"
            id="listbox-item-0" role="option" class="text-gray-900 cursor-default hover:bg-orange-500 hover:text-white select-none relative py-2 pl- pr-9 ">
          <span
            :class="{ 'font-semibold': selectedOption.value === option.value, 'font-normal': !(selectedOption.value === option.value) }"
            class="block truncate">
            {{ option.label }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "thedropdwon",
  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      required: true,
      default: () => ''
    },
    errors:{
      type:Boolean,
      default: () => false
    }
  },
  data() {
    return {
      selectedOption: {},
      isOpen: false,
    }
  },
  methods: {
    click (event) {
      this.$emit('custom-click', event);
    },
    selectOption(item) {
      this.selectedOption = item;
      this.isOpen = !this.isOpen
      console.log(item)
      this.$emit('input', item.value)
    },
    clickBlures() {
      console.log('blur ====>>')
      this.isOpen = false
    }
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
</style>
