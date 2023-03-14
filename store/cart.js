export const state = () => ({
  cartList: null,
  cartItem: null,
  totalPrice: null
})
export const getters = {
  getCartItems: (state) => state.cartItem,
  getVendors: (state) => state.cartList
};
export const mutations = {
  SET_CART_LIST: (state, payload) => {
    state.cartList = payload
  },
  SET_TOTAL_PRICE: (state, payaload) => {
    state.totalPrice = payaload
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
          ...payload
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
  async getCardItem({commit}, payload) {
    try {
      const id = payload.id;
      delete payload.id;
      const populate = 'order_items, vendor, vendor.user, vendor.user.avatar,order_items.product,order_items.product.media'
      const {data} = await this.$axios.get(`carts/${id}`, {params: {populate, ...payload}})
      console.log(data)
      const newdata = {
        id: data.id,
        vendor_img: data.vendor.user.avatar.aws_path,
        full_name: data.vendor.user.first_name + " " + data.vendor.user.last_name,
        total_price: data.order_items.reduce((acc, el) => acc + el.price, 0),
        vendor_id: data.vendor.id,
        items: data?.order_items?.map((el, index) => {
          return {
            count: el.count,
            price: el.price,
            id: el.id,
            image: el.product.media[0]?.aws_path,
            min_amount: el.product?.min_amount,
            name: el.product.name,
            vendor_id: data.vendor.id,
            amount: el.product.amount
          }
        })

      }
      commit('SET_CART_ITEM', newdata)
      return newdata;
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
  }
};
