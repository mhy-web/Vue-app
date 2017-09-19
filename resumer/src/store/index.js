import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from "object-path"


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        { field: 'profile', icon: 'id' },
        { field: 'workHistory', icon: 'work' },
        { field: 'education', icon: 'book' },
        { field: 'projects', icon: 'heart' },
        { field: 'awards', icon: 'cup' },
        { field: 'contacts', icon: 'phone' },
      ],
      profile: {
        name: '马华元',
        city: '北京',
        title: 'web前端工程师',
        birthday: '1991-03-12'
      },
      workHistory: [
        {
          company: '中建一局(集团)第二建筑有限公司', content: `中国建筑工程总公司2016年名列“世界500强第27位”，中建一局为其核心子企业，公司总部设在大兴区。中国建筑的经营业绩遍布国内及海外一百多个国家和地区，涉及工程建设、投资开发、勘察设计等多个领域。
我的主要工作如下:
1. 作为机电BIM工程师，我的主要工作内容包括：BIM模型建造、碰撞检查、进度模拟、三维交底、图纸深化设计、综合管汇、工作汇报等。
2. 作为暖通专业的资料员，负责项目工程资料的编写，包括物资报验、检验批制作、工程试验报告等。`
        }
      ],
      education: [
        { school: '中南大学', content: '本科' },
      ],
      projects: [
        { name: 'project A', content: '文字' },
        { name: 'project B', content: '文字' },
      ],
      awards: [
        // { name: '再来十瓶', content: '连续十次获得「再来一瓶」奖励' },
        // { name: '三好学生'},
      ],
      contacts: [
        { contact: 'tel', content: '15910506370' },
        { contact: 'qq', content: '979599258' },
      ],
    }
  },
  mutations: {
    initState(state, payload){
      Object.assign(state, payload)
    },
    switchTab(state, payload) {
      state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
      localStorage.setItem('state', JSON.stringify(state))
    },
    updateResume(state, {path, value}){
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state', JSON.stringify(state))
    },
    setUser(state, payload){
      Object.assign(state.user, payload)
      // console.log(state.user)
    },
    removeUser(state){
      state.user.id = null
    }
  }
})
