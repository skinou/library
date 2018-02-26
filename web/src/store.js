import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const data = [
  {
    book: '三体',
    author: '刘慈恩',
    tag: '外借',
    item: ['科学', '小说']
  }, {
    book: '狂人日记',
    author: '鲁迅',
    tag: '在库',
    item: ['文学']
  }, {
    book: '瓦尔登湖',
    author: '亨利·戴维·梭罗',
    tag: '外借',
    item: ['文学', '小说', '自然']
  }, {
    book: '天龙八部',
    author: '金庸',
    tag: '外借',
    item: ['小说']
  }
]

export default new Vuex.Store({
  state: {
    data,
    leaseData: [],
    storeData: [],
    scienceData: [],
    literatureDta: [],
    novelData: [],
    natureData: []
  },
  mutations: {
    getLease (state) {
      state.leaseData = []
      state.data.forEach((value, index) => {
        if (value.tag === '外借') {
          state.leaseData.push(value)
        }
      })
      return state.leaseData
    },
    getStore (state) {
      state.storeData = []
      state.data.forEach((value, index) => {
        if (value.tag === '在库') {
          state.storeData.push(value)
        }
      })
      return state.storeData
    },
    getScience (state) {
      state.scienceData = []
      state.data.forEach((value, index) => {
        value.item.forEach((itemValue, index) => {
          if (itemValue === '科学') {
            state.scienceData.push(value)
          }
        })
      })
      return state.scienceData
    },
    getLiterature (state) {
      state.literatureDta = []
      state.data.forEach((value, index) => {
        value.item.forEach((itemValue, index) => {
          if (itemValue === '文学') {
            state.literatureDta.push(value)
          }
        })
      })
      return state.literatureDta
    },
    getNovel (state) {
      state.novelData = []
      state.data.forEach((value, index) => {
        value.item.forEach((itemValue, index) => {
          if (itemValue === '小说') {
            state.novelData.push(value)
          }
        })
      })
      return state.novelData
    },
    getNature (state) {
      state.natureData = []
      state.data.forEach((value, index) => {
        value.item.forEach((itemValue, index) => {
          if (itemValue === '自然') {
            state.natureData.push(value)
          }
        })
      })
      return state.natureData
    }

  }
})
