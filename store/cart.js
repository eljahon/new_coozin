export const state = () => ({
  cartList: null,
  cartItem: null,
  totalPrice: null,
  foodsTime: null,
  worktimeList: null,
  isWorktime: false,
  timList: null,
  preparation_time: null,
})
export const getters = {
  getCartItems: (state) => state.cartItem,
  getVendors: (state) => state.cartList,

};
export const mutations = {
  SET_FOODS_TIME: (state, payload) => {
    state.foodsTime = payload
  },
  SET_PR_TIME: (state, payload) => {
    state.preparation_time = payload
  },
  SET_TIME_LIST: (state, payload) => {
    state.timList = payload
  },
  SET_VENDOR_TIME: (state, payload) => {
    state.worktimeList = payload
  },
  SET_CART_LIST: (state, payload) => {
    state.cartList = payload
  },
  SET_CART_ITEM: (state, payload) => {
    state.cartItem = payload
  }
};
export const actions = {
  async getCardList({commit, state}, payload) {
    try {
      const {data: {results}} = await this.$axios.get('carts', {
        params: {
          populate: 'vendor,user,vendor.user,order_items',
          filters: {
            user: {
              id: {
                $eq: this.$auth.user.id
              }
            }
          }
        }
      })
      const formatData = results.map((el, index) => {
        return {
          total_price: el.order_items.reduce((acc, el) => acc + el.price, 0),
          full_name: el.vendor.user.first_name + " " + el.vendor.user.last_name,
          cart_id: el.id,
          cart_number: index + 1,
        }
      })
      commit('SET_CART_LIST', formatData)
      return formatData;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getCardItem({commit, dispatch}, payload) {
    try {
      const id = payload.id;
      delete payload.id;
      const populate = 'order_items,vendor,user,vendor.user,vendor.user.avatar,order_items.product,order_items.product.media'
      const {data} = await this.$axios.get(`carts/${id}`, {params: {populate, ...payload}})
      const newdata = {
        id: data.id,
        vendor_img: data.vendor.user.avatar.aws_path,
        full_name: data.vendor.user.first_name + " " + data.vendor.user.last_name,
        total_price: data.order_items.reduce((acc, el) => acc + (el.price * el.count), 0),
        vendor_id: data.vendor.id,
        user: data.user.id,
        items: data?.order_items?.map((el, index) => {
          return {
            count: el.count,
            price: el.price,
            id: el.id,
            image: el.product.media[0]?.aws_path,
            min_amount: el.product?.min_amount,
            name: el.product.name,
            vendor_id: data.vendor.id,
            preparation_time: el.product.preparation_time,
            amount: el.product.amount,
            product: el.product.id
          }
        })

      }
      // console.log('salom==============')
      commit('SET_CART_ITEM', newdata);
      const _timedata = newdata.items.map(el => el.preparation_time)
      commit('SET_PR_TIME', _timedata)
      return _timedata;
    } catch (err) {
      return err
    }
  },
  async newOrderCreate({commit, state, dispatch}, payload) {
    try {
      const data = await this.$axios.post('/orders/assign/cart', {...payload})
      this.$toast.success('new order item corzina add')
      return data;
    } catch (err) {
      this.$toast.error(err)
    }
  },
  async removeCart({commit,}, payload) {
    try {
      // console.log(payload)
      const {data} = await this.$axios.delete(`carts/${payload}`);
      return data.results;
    } catch (err) {
      this.$toast.error(err)
    }
  },
  async removeCartItem({commit, state}, payload) {
    try {
      const {data} = await this.$axios.delete(`order-items/${payload}`);
      this.$toast.success('order item remove corzina ')
      // dispatch('getCardItem', {id:order_id, latitude,longitude})
      return data;
    } catch (err) {
      throw  new Error(err)
    }
  },
  async serverTime({commit, state}, payload) {
    try {
      const {data} = await this.$axios.get(`server/time`);
      return data;
    } catch (err) {
      throw  new Error(err)
    }
  },
  async orderItemsCount({commit, dispatch, state}, payload) {
    try {
      const id = payload.id;
      const data = {
        vendor: payload.vendor_id,
        user: payload.user,
        items: payload.items.map((el) => {
          return {
            count: el.count,
            product: el.product
          }
        })
      }
      await dispatch('newOrderCreate', data)
      await dispatch('getCardItem', {id})
      // commit('SET_CART_ITEM', payload)
    } catch (err) {
      throw  new Error(err)
    }
  },
  async getDishs({commit}, payload) {
    try {
      const {id} = payload;
      const {data} = this.$axios.get(`/dishes/cart/${id}`, {
        params: {
          populate: '*',
          locale: this.$i18n.locale
        }
      })
      console.log(data)
      return data;
      // commit('SET_CART_ITEM', payload)
    } catch (err) {
      throw  new Error(err)
    }
  },
  async getSetting({commit}, payload) {
    try {
      const {data} = await this.$axios.get(`setting`, {
        params: {
          populate: '*',
          locale: this.$i18n.locale
        }
      })
      commit('SET_VENDOR_TIME', data)
      return data;
      // commit('SET_CART_ITEM', payload)
    } catch (err) {
      throw  new Error(err)
    }
  },
  timeGeneret({commit, state}, payload) {
    const _dateNow = this.$dayjs().format('HH:mm').split(':').map(Number);
    const _maxTime = Math.max(...payload)
    const _oldTime = payload.filter((el) => el !== _maxTime).reduce((acc, el) => acc + (el * 0.25), 0);
    const _allTime = _dateNow[1] + _maxTime + _oldTime;
    let _pripretionTimes = this.$dayjs(this.$dayjs().minute(_allTime)).format('HH:mm');
    let _beginHours = _pripretionTimes.split(':').map(Number)[0];
    let _beginMinuts = _pripretionTimes.split(':').map(Number)[1];
    let timeList = [];
    while (_beginHours < 21) {
      timeList.push({
        label: `${this.$dayjs(this.$dayjs().hour(_beginHours)).format('HH:mm')}-${this.$dayjs(this.$dayjs().hour(_beginHours+1)).format('HH:mm')}`,
        value: `${this.$dayjs(this.$dayjs().hour(_beginHours).minute(30)).format('HH:mm')}`,
      })
      _beginHours++;
    }
    commit('SET_TIME_LIST', timeList)
    // commit('SET_FOODS_TIME', newdata.items.map((el) =>el.preparation_time));
    // if (allTime> 60  && dateNow[0] > 21 && dateNow[0] <9) {
    //
    // }
  },
  isToDay({commit, state}, payload) {
    const _prTime = JSON.parse(JSON.stringify(state.preparation_time))
    const _maxTime = Math.max(..._prTime)
    const _oldTime = _prTime.filter((el) => el !== _maxTime).reduce((acc, el) => acc + (el * 0.25), 0);
    const _allTime = _maxTime + _oldTime + state.worktimeList.max_delivery_time;
    let _pripretionTimes = this.$dayjs(this.$dayjs().hour(9).minute(_allTime)).format('HH:mm');
    let _beginHours = _pripretionTimes.split(':').map(Number)[0];
    let _beginMinuts = _pripretionTimes.split(':').map(Number)[1];
    let timeList = [];
    while (_beginHours < 21) {
      timeList.push({
        label: `${this.$dayjs(this.$dayjs().hour(_beginHours)).format('HH:mm')}-${this.$dayjs(this.$dayjs().hour(_beginHours+1)).format('HH:mm')}`,
        value: `${this.$dayjs(this.$dayjs().hour(_beginHours).minute(30)).format('HH:mm')}`,
      })
      _beginHours++;
    }
    commit('SET_TIME_LIST', timeList)
  }
};
