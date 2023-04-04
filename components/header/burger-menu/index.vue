<template>
  <div>
    <div class="burger px-6 py-4" :class="{'open':$store.state.burger}">
      <div class="bg-white rounded-2xl flex flex-col gap-2 w-full mb-4">
        <div class="bg-white rounded-2xl flex flex-col gap-6 w-full">
          <div class="flex items-center justify-between">
            <the-logo />
            <header-card addStyle="w-12">
              <div @click="$store.dispatch('burgerOpen', false)">
                <the-icon src="x"/>
              </div>
            </header-card>
          </div>
          <div @click="goToPage('/')">
            <div class="flex gap-4 cursor-pointer">
              <h4 class="text-color-700 font-normal">{{ $t('main') }}</h4>
            </div>
          </div>
          <div @click="goToPage('/about-us')">
            <div class="flex gap-4 cursor-pointer">
              <h4 class="text-color-700 font-normal">{{ $t('about-us') }}</h4>
            </div>
          </div>
          <div @click="goToPage('/vendor')">
            <div class="flex gap-4 cursor-pointer">
              <h4 class="text-color-700 font-normal">{{ $t('vendor') }}</h4>
            </div>
          </div>
        </div>
        <!-- <h3 @click="goToHome" class="text-xl font-semibold text-gray-800">Главная</h3>
        <h3 class="text-xl font-semibold text-gray-800">О нас</h3>
        <h3 class="text-xl font-semibold text-gray-800">Повара</h3> -->
      </div>
    </div>
    <div v-if="$store.state.burger" @click="$store.dispatch('burgerOpen', false)" class="burger-background"></div>
  </div>
</template>

<script>
import HeaderCard from "~/components/header/header-card";

export default {
  data() {
    return {
      user: [],
      profile: [
        {
          icon: 'pencil',
          title: 'Редактировать',
          name: 'update',
          link: '/profile'
        },
        {
          icon: 'clipboard',
          title: 'Мои заказы',
          link: '/my-orders'
        },
        {
          icon: 'heart',
          title: 'Мои подписки',
          name: 'subscriptions'
        },
        {
          icon: 'credit-card',
          title: 'Мои карты',
          name: 'credit-cards'
        },
        {
          icon: 'share',
          title: 'Поделиться',
          name: 'share'
        },
        {
          icon: 'chat',
          title: 'Чат',
          name: 'chat'
        },
        {
          icon: 'logout',
          title: 'Выйти',
          name: 'logout'
        },
      ],
      defaultBurger: [
        {
          icon: 'pencil',
          title: this.$t('main'),
          name: 'update',
          link: '/'
        },
        {
          icon: 'pencil',
          title: this.$t('about-us'),
          name: 'update',
          link: '/'
        },
        {
          icon: 'pencil',
          title: this.$t('vendor'),
          name: 'update',
          link: '/'
        },
      ]
    }
  },
  components: {
    'header-card': HeaderCard
  },
  methods: {
    goToPage(route) {
      this.$store.dispatch('burgerOpen', false)
      this.$router.push({
        path: this.localePath(route)
      })
    }
  }
}
</script>

<style scoped>
.burger {
  position: fixed;
  z-index: 12;
  top: 0;
  bottom: 0;
  left: -350px;
  width: 350px;
  background: #ffffff;
  transition: .3s;
}
.burger-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: #111827;
  opacity: 0.3;
}
.open {
  left: 0;
}
</style>
