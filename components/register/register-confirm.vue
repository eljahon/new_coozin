<template>
  <div class="login-modal">
    <div @click="$routePush({register: undefined})" class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center relative x-position cursor-pointer">
      <the-icon src="x" />
    </div>
    <h2 class="text-2xl font-bold text-center text-gray-700">{{ $t('confirm-otp') }}</h2>
    <input
      class="bg-white text-gray-500 border rounded-2xl border-gray-200
       py-2.5 px-4 text-base h-12 outline-orange-600 sm:w-96 w-full bg-gray-100 mt-6 mb-2"
      v-model="otp"
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
    <button
      @click="confirmRegister"
      class="sm:w-96 w-full h-14 rounded-3xl bg-orange-600 text-white font-semibold"
      :class="!otp.length || disabled ? 'opacity-70' : ''"
      :disabled="!otp.length || disabled"
    >Войти</button>
  </div>
</template>


<script>
export default {
  props: ['data'],
  data() {
      return {
          otp: '',
          disabled: false,
          count: 0,
          timer: '00:'
      }
  },
  methods: {
      async confirmRegister() {
        this.disabled = true
        try {
          const { data: { jwt } } = await this.$axios.post('/users-permissions/register_confirm_otp', {
              phone: this.data.phone,
              otp: this.otp
          });
          await this.$auth.setUserToken(jwt)
          await this.$emit('confirm')
          await this.$routePush({ register: undefined })
          
        } catch(e) {
          this.disabled = false
        }
      },
      async resendOtp() {
        try {
          if (this.count == 0) {
            await this.$axios.post('/users-permissions/register_otp', this.data)
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
      }
  },
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