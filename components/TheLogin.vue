<template>
  <div v-if="$route.query.login === 'login'" class="login">
    <div v-if="isLogin" class="login-modal">
      <div @click="close" class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center relative x-position cursor-pointer">
        <the-icon src="x" />
      </div>
      <h2 class="text-2xl font-bold text-center text-gray-700">{{ $t('login-account') }}</h2>
      <p class="text-lg text-center text-gray-700 mt-1">У вас ещё нет аккаунта?
        <span @click="$routePush({login: undefined, register: 'register'})" class="text-orange-600 cursor-pointer font-semibold	">{{ $t('registration') }}</span>
      </p>
      <ValidationObserver class="w-full" ref="observer" v-slot="{ passes, invalid }">
        <form @submit.prevent="passes(handalePhone)">
          <ValidationProvider
            v-slot="{ valid, errors }"
            rules="required"
            name="Username"
          >
            <label for="phone" v-if="errors.length" class="block text-red-500 my-1">{{$t('phone')}}</label>
            <input
              name="phone"
              class="block bg-white text-gray-500 border rounded-2xl border-gray-200 py-2.5 px-4 text-base h-12 outline-orange-600 sm:w-96 w-full bg-gray-100 my-4 m-auto"
              v-model.trim="phone"
              @input="checkPhone"
              :placeholder="$t('enter-phone-or-email')"
              :state="errors[0] ? false : valid ? true : null"
              :class="errors.length > 0 ? 'border-red-700': ''"
              type="text"
            >
          </ValidationProvider>
          <button
            type="submit"
            class="sm:w-96 w-full h-14 rounded-3xl bg-orange-600 text-white font-semibold"
          >{{ $t('get-password') }}</button>
        </form>
      </ValidationObserver>
      <!--         <login-phone/>-->
    </div>
    <div v-else class="login-modal">
      <div @click="$routePush({login: undefined})" class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center relative x-position cursor-pointer">
        <the-icon src="x" />
      </div>
      <h2 class="text-2xl font-bold text-center text-gray-700">{{ $t('login-account') }}</h2>
<!--      <login-otp/>-->
      <input
        class="bg-white text-gray-500 border rounded-2xl border-gray-200
         py-2.5 px-4 text-base h-12 outline-orange-600 sm:w-96 w-full bg-gray-100 mt-6 mb-2"
        v-model="login.otp"
        placeholder="Enter OTP"
        type="text"
      >
      <div class="flex items-center justify-between mb-4">
          <span v-if="count">
            {{ timer + count }}
          </span>
          <span></span>
          <span 
            @click="resendOtp" 
            class="text-lg font-bold text-right text-orange-500"
            :class="count ? 'cursor-wait' : 'cursor-pointer'"
          >
            {{ $t('resend-otp') }}
          </span>
       </div>
      <input
        @click="submitLogin"
        class="sm:w-96 w-full h-14 rounded-3xl bg-orange-600 text-white font-semibold"
        :class="!login.otp.length || disabled ? 'opacity-70' : ''"
        value="Войти"
        type="button"
        :disabled="!login.otp.length || disabled"
      />
    </div>
    <div @click="close" class="login-background"></div>
  </div>
</template>

<script>
import LoginPhone from "~/components/login/login-phone";
export default {
  components: {LoginPhone},
  data() {
    return {
      isLogin: true,
      phone: '',
      timer: '00:',
      count: 0,
      login: {
        phone: '',
        otp: ''
      },
      disabled: false
    }
  },
  methods: {
    async resendOtp() {
      try {
        if (this.count == 0) {
          await this.$axios.post('/users-permissions/resend_otp', {
            phone: this.login.phone
          })
          this.count = 59;
          let time = setInterval(() => {
            if (this.count > 0 && 10 >= this.count) {
              this.timer = '00:0'
              this.count--
            } else if (this.count > 0) {
              this.count--
            } else {
              if (this.count === 0) {
                clearInterval(time)
              }
            }
          }, 1000)
        }
      } catch (e) {}
    },
    async submitLogin() {
      this.disabled = true
      try {
        if (this.disabled) {
          const {data: { jwt }}= await this.$auth.loginWith('local', { data: this.login })
          this.$auth.setUserToken(jwt)
          this.isLogin = true
          await this.$routePush({login: undefined})
          await this.$toast.success('success Login')
          await this.$store.dispatch('cart/getCardList')
        }
      } catch (e) {
        console.log(e)
        this.$toast.error(e, {
          duration: 2000,
          position: 'bottom-right',
        })
        setTimeout(() => {
          this.disabled = false
        }, 2000)
      }
    },
    async handalePhone() {
      try {
        await this.$axios.post('/users-permissions/send_otp', {
          phone: this.login.phone
        })
        this.isLogin = false
      } catch (e) {}
    },
    close() {
      this.$routePush({login: undefined})
      this.isLogin = true
      this.login.otp = ''
      this.phone = ''
    },
    checkPhone(e) {
      let el = e.target.value.trim()
      if (el.length > 0 && el[0] !== '+') {
        this.phone = '+998' + this.phone
      }
      this.login.phone = this.phone
    }
  }
}
</script>

<style scoped>
.login-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: #111827;
  opacity: 0.3;
}
.x-position {
  position: absolute;
  top: 14px;
  right: 14px;
}
.login-modal {
  position: fixed;
  z-index: 5;
  padding: 48px 24px 32px 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
}
@media screen and (max-width: 450px) {
  .login-modal {
    width: 96%;
  }
}
</style>