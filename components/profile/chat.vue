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
              :key="message?.id"
              class="relative group"
              :class="message?.sender?.id == $auth.user?.id ? 'user' : 'operator'"
            >
              <span>{{ message?.text }}</span>
              <div
                class="flex gap-1.5 absolute group-hover:flex p-3"
                :class="message?.sender?.id == $auth.user.id ? '-left-14 bottom-0' : 'hidden'"
              >
                <div
                  class="hidden group-hover:flex gap-1.5"
                  :class="message?.sender?.id !== $auth.user?.id ? 'group-hover:hidden' : ''"
                >
                  <div @click="editMessage(message)">
                    <the-icon  class="cursor-pointer" src="edit" width="16" />
                  </div>
                  <div @click="deleteMessage(message)">
                    <the-icon class="cursor-pointer" src="delete" width="16" />
                  </div>
                </div>
              </div>
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
  name: "chat_pages",
  data() {
    return {
      socket: null,
      messages: [],
      inputMessage: '',
      roomOpen: false,
      update: false,
      editID: 0,
    }
  },
  async mounted() {
    this.socket = await io('https://testbackend.coozin.uz/')
    await this.socket.emit('join', {
      username: this.$auth.user.username,
      user_id: this.$auth.user.id
    });
    await this.socket.on('joined', message => console.log(message));
    await this.getOperator()
    await this.getRooms()
    await this.getMessages()
    await this.chatToBottom()
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
        const index = results.findIndex(el => el.sender.id === this.$auth.user.id)
        const id = index >= 0 ? results[index].id : 0
        this.$routePush({ ...this.$route.query, room_id: id })
      } catch(err) {
        console.log(err)
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
                id: +this.$route.query.room_id
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
    async createRoom() {
      try {
        await this.socket.emit('createRoom', {
          sender: +this.$route.query.user_id,
          receiver: +this.$route.query.operator,
          branch: 1
        })
      } catch(err) {
        console.log(err);
      }
    },
    async joinRoom() {
      try {
        await this.socket.emit('joinRoom', {
          username: this.$auth.user.username,
          room: +this.$route.query.room_id
        });
        await this.socket.on('joinedRoom', message => {
          console.log(message)
        })
      } catch(err) {
        console.log(err);
      }
    },
    async listenMessage() {
      try {
        this.socket.on('message', res => {
          if (this.messages.findIndex(el => el.id == res.data.id) == -1) {
            this.messages.push(res.data)
          } else {
            const index = this.messages.findIndex(el => el.id == res.data.id)
            this.messages[index].text = res.data.text
          }
          this.chatToBottom()
        })
      } catch (err) {
        console.log(err)
      }
    },
    async sendMessage() {
      // Create Room
      if (!+this.$route.query.room_id && this.inputMessage.length) {
        await this.createRoom()
        await this.getRooms()
        await this.joinRoom()
        await this.listenMessage()
        this.roomOpen = true
      }
      // Open romm
      else if (!this.roomOpen) {
        await this.joinRoom()
        await this.socket.on(message => console.log(message))
        await this.listenMessage()
        this.roomOpen = true
      }
      // Update Message
      if (this.update) {
        this.updateMessage()
      }
      // Send Message
      else if (!this.update && this.inputMessage.length) {
        await this.socket.emit("sendMessage", {
          text: this.inputMessage,
          sender: +this.$route.query.user_id,
          receiver: +this.$route.query.operator,
          room: +this.$route.query.room_id,
          seen: true
        })
      }
      // Clear input of chat
      this.inputMessage = ''
      this.update = false
    },
    editMessage(message) {
      this.editID = message.id
      this.inputMessage = message.text
      this.update = true
      console.log(message)
    },
    async updateMessage() {
      try {
        this.socket.emit('editMessage', {
          id: this.editID,
          data: {
            text: this.inputMessage,
            sender: +this.$route.query.user_id,
            receiver: +this.$route.query.operator,
            room: +this.$route.query.room_id,
            seen: true
          }
        })
      } catch(err) {
        console.log(err);
      }
    },
    async deleteMessage(message) {
      console.log(message);
      try {
        const index = this.messages.findIndex(res => res.id == message.id)
        await this.socket.emit('deleteMessage', {
          id: message.id,
          room: message.room.id
        })
        await this.messages.splice(index, 1)
        this.inputMessage = ''
        this.update = false
      } catch(err) {
        console.log(err);
      }
    },
    chatToBottom() {
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
    },
    async getOperator() {
      try {
        const {data:{users}} = await this.$axios.get('users', {
          params: {
            populate: '*',
            filters: {role: {id: {$eq: 4}}}
          }
        });
        console.log(users)
        this.$routePush({...this.$route.query, operator: users[0].id, user_id: this.$auth.user.id})
      } catch (err) {
        console.log(err)
      }
    }
  },
  beforeDestroy () {
    this.socket.emit('leave', {
      username: this.$auth.user.username,
      user_id: +this.$route.query.user_id
    })
    this.socket.on('left', res => console.log(res))
    this.socket.emit('leaveRoom', {
      username: this.$auth.user.username,
      room: +this.$route.query.room_id
    })
    this.socket.on('leftRoom', res => console.log(res))
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
