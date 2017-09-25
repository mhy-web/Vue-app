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
          company: '中建一局(集团)第二建筑有限公司',
          content: `中国建筑工程总公司2016年名列“世界500强第27位”，中建一局为其核心子企业，公司总部设在大兴区。中国建筑的经营业绩遍布国内及海外一百多个国家和地区，涉及工程建设、投资开发、勘察设计等多个领域。
          主要业绩:
          1. 由我完成的机电专业BIM模型作为入选一局集团作品集，用于参加“龙图杯”等多项国家级BIM大赛(“龙图杯”已经过了初评阶段)。
          2. 应用BIM技术进行图纸深化设计，在经过甲方专家论证后通过后，用于指导施工。`
        }
      ],
      education: [
        { school: '中南大学', content: '本科' },
      ],
      projects: [
        { name: 'Todolist.待办事项清单', content: '基于Vue框架开发的待办事项清单，使用Webpack进行依赖管理和打包。' },
        { name: 'Resumer.简历模板', content: '基于 Vue 框架开发的简历模板，使用 Webpack 配置项目文件、打包和安装依赖，使用Leancloud进行账号管理。' },
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
