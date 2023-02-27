<template>
  <div class="p-6 bg-white rounded-2xl flex flex-col w-full gap-6 lg:h-auto h-96">
    <h3 class="font-semibold text-xl text-color text-left ">Оставьте свой вопрос</h3>
    <div class="h-full w-full bg-gray-50 rounded-2xl px-8 py-5 relative">
      <h4 class="text-center text-sm text-gray-600">Октябрь 16</h4>
      <div class="absolute bottom-5 right-8 left-8">
        <div class="relative">
          <input 
            class="w-full bg-white h-14 pl-8 pr-14 rounded-full outline-orange-600" 
            type="text" 
            placeholder="Написать сообщение"
            v-model="inputMessage"
            @keypress.enter="sendMessage"
          >
          <div @click="sendMessage" class="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center absolute top-2 right-2 cursor-pointer">
            <the-icon src="send" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: "",
  data() {
    return {
      user: {
        username: "eljahon",
        user_id: 3780
      },
      userRoom: {
        username: "eljahon",
        room: 2
      },
      operator: {
        username: "operator",
        room: 3824
      },
      operatorRoom: {
        username: "operator",
        room: 2
      },
      socket: null,
      messages: [],
      message: {
      }
    }
  },
  mounted() {
    this.socket = io('https://testbackend.coozin.uz/')

    this.socket.on('joined', message => {
      console.log(message);
    });
    this.socket.on('joinedRoom', message => {
      console.log(message);
    });
    this.socket.on('message', message => {
      console.log(message);
    });
    this.socket.emit('join', this.user);
    this.socket.emit('join', this.operator);
    this.socket.emit('joinRoom', this.userRoom);
    this.socket.emit('joinRoom', this.operatorRoom);
  },
  methods: {
    sendMessage() {
      console.log('Hi');
      if (this.inputMessage) {
        this.socket.emit("sendMessage", {
          text: this.inputMessage,
          sender: 3780,
          receiver: 3824,
          room: 2,
          seen: true
        })
        this.inputMessage = ''
      }
    },
    
  },
  beforeDestroy () {
    this.socket.disconnect()
  }
}
</script>

<style scoped>

</style>
