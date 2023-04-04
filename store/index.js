export const state = () => ({
  currentUser: {},
  login: false,
  register: false,
  burger: false,
  mapOrder: false,
  food: false,
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
  },
  days_list: [],
  location: null,
  locatinsName: null,
});
export const mutations = {
  SET_DAY: (state, payload) => {
    state.days_list = payload
  },
  SET_MAPS_ORDER: (state, payload) => {
    state.mapOrder = payload
  },

  SET_LOCATION_NAME: (state, paylaod) => {
    state.locatinsName = paylaod;
  },
  BURGER_OPEN: (state, payload) => {
    state.burger = payload
  },
};
export const actions = {
  set_day({commit,state}, payload) {
    let days = [];
    let weekDay={
      '0': 'sunday',
      '1': 'monday',
      '2': 'tuesday',
      '3': 'wednesday',
      '4': 'thursday',
      '5': 'friday',
      '6': 'saturday'
    }
    for (let i=0; i<7; i++) {
    days.push({
      isActive: i === 0,
      date: this.$dayjs(new Date ()).add(i, 'day').format('YYYY-MM-DD'),
      seeDate: this.$dayjs(new Date ()).add(i, 'day').format('DD'),
      name: state.monthNames[this.$dayjs(new Date ()).add(i, 'day').format('YYYY-MM-DD').split('-')[1]],
      weekday: weekDay[Number(this.$dayjs(new Date ()).add(i, 'day').format('d'))]
    })
    };
    commit('SET_DAY', days)
  },
  async setVendorWeekday ({commit,state}, payload) {
    const vendorWorkingday =[...payload];
    const dayList = JSON.parse(JSON.stringify(state.days_list))
    const workingDay = dayList.map((el) => {
      if(vendorWorkingday.includes(el.weekday)) {
        el['isWorkDay'] = false;
        return el;
      } else {
        el['isWorkDay'] = true;
        return el;
      }
    })
    commit('SET_DAY', workingDay)
  },
  async setAticeDay ({commit,state}, payload) {
    console.log('salom =====>>')
    const dayList = JSON.parse(JSON.stringify(state.days_list))
    const activeDay = dayList.map((el) => {
      if(el.date === payload) {
        el.isActive = true;
        return el;
      } else {
        el.isActive = false;
        return el;
      }
    })
    commit('SET_DAY', activeDay)
  },
  setMapOrder({commit}, payload) {
    commit('SET_MAPS_ORDER', payload)
  },
  burgerOpen({ commit }, payload) {
    commit('BURGER_OPEN', payload)
  },
  set_location_name ({commit}, payload) {
    commit("SET_LOCATION_NAME", payload)
    this.$cookies.set('lacationName', payload)
  }
};
export const getters = {
  get_user_lit: (state) => state.userList,
  get_days_list: (state) => state.days_list
};
