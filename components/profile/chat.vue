<template>
  <div class="p-6 bg-white rounded-2xl flex flex-col w-full gap-6 h-auto">
    <h3 class="font-semibold text-xl text-color text-left ">Оставьте свой вопрос</h3>
    <div class="h-full w-full bg-gray-50 rounded-2xl px-8 py-5 relative">
      <h4 class="text-center text-sm text-gray-600">Октябрь 16</h4>
      <div class="flex flex-col justify-between h-96 py-4">
        <div class="flex flex-col justify-between h-full">
          <div 
            class="flex flex-col justify-between py-4 overflow-y-scroll pr-5 pb-10"
            ref="chat"
          >
            <div
              v-for="message in messages"
              :key="message.id"
              :class="message.sender.id == $auth.user.id ? 'user' : 'operator'"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
        <div class="absolute bottom-4 right-4 left-4">
          <div class="relative">
            <input 
              class="w-full bg-white h-14 pl-8 pr-14 rounded-full outline-orange-600" 
              type="text"
              placeholder="Написать сообщение"
              v-model.trim="inputMessage"
              @keypress.enter="sendMessage"
            >
            <div @click="sendMessage" class="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center absolute top-2 right-2 cursor-pointer">
              <the-icon src="send" />
            </div>
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
      user: null,
      roomId: 0,
      socket: null,
      messages: [],
      inputMessage: '',
      roomOpen: false
    }
  },
  async mounted() {
    this.user = this.$auth.state.user
    this.socket = await io('https://testbackend.coozin.uz/')
    await this.socket.emit('join', {
      username: this.user.username,
      user_id: this.user.id
    });
    await this.socket.on('joined', message => console.log("Joined: ", message));
    await this.getRooms()
    await this.getMessages()
    this.$nextTick(() => {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
    })
    console.log(this.user);
  },
  methods: {
    async getRooms() {
      try {
        const {data: { results }} = await this.$axios.get('chatrooms', {
          params: {
            populate: {
              sender: true
            }
          }
        })
        const index = results.findIndex(el => el.sender.id === this.user.id)
        this.roomId = index >= 0 ? results[index].id : 0 
      } catch(err) {
        console.log(err);
      }
    },
    async getMessages() {
      try {
        const { data: { results } } = await this.$axios.get('chatmessages', {
          params: {
            populate: {
              receiver: {
                populate: {
                  avatar: true
                }
              },
              sender: {
                populate: {
                  avatar: true
                }
              },
              room: true,
              media: true,
            },
            pagination: {
              page: 1,
              pageSize: 999999
            },
            filters: {
              room: {
                id: this.roomId
              }
            },
            sort: [
              'createdAt:asc'
            ],
          }
        })
        this.messages = results
      } catch(err) {
        console.log(err);
      }
    },
    sendMessage() {
      console.log("Room id: ", this.roomId);
      if (!this.roomId && this.inputMessage.length) {
        console.log("Room created");
        this.socket.emit('createRoom', {
          sender: this.user.id,
          receiver: 3824,
          branch: 1
        })
        this.socket.emit('joinRoom', {
          username: this.user.username,
          room: this.roomId
        });
        this.socket.on('joinedRoom', message => {
          console.log('joinedRoom: ', message)
        })
        this.socket.on('message', res => {
          this.messages.push(res)
          console.log('message', res);
        })
        this.roomOpen = true
      } else if (!this.roomOpen) {
        this.socket.emit('joinRoom', {
          username: this.user.firstname,
          room: this.roomId
        });
        this.socket.on('joinedRoom', message => console.log(message));
        this.socket.on('message', message => {
          this.messages.push(message)
          console.log(message);
        })
        this.roomOpen = true
        console.log("joinRoom");
        console.log('joinedRoom');
      }

      if (this.inputMessage.length) {
        this.socket.emit("sendMessage", {
          text: this.inputMessage,
          sender: this.user.id,
          receiver: 3824,
          room: this.roomId,
          seen: true
        })
        let message = {
          sender: {
            id: this.user.id,
          },
          text: this.inputMessage
        }
        this.messages.push(message)
        this.$nextTick(() => {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        })
        this.inputMessage = ''
      }
    },
    
  },
  beforeDestroy () {
    this.socket.emit('leave', {
      username: this.user.username,
      user_id: this.user.id
    })
    this.socket.emit('leaveRoom', {
      username: this.user.username,
      room: this.roomId
    })
    this.socket.disconnect()
  }
}
</script>

<style scoped>
.operator {
  background: #E0F2FE;
  border-radius: 8px 8px 8px 0px;
  padding: 8px 12px;
  width: fit-content;
  max-width: 60%;
  margin: 8px 0;
}
.user {
  background: #E5E7EB;
  border-radius: 8px 8px 0px 8px;
  padding: 8px 12px;
  width: fit-content;
  max-width: 60%;
  margin: 8px 0;
  align-self: end;
}
</style>
