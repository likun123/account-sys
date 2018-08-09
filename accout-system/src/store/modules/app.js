// import Cookies from 'js-cookie'

const app = {
  state: {
    token: '',
    user:'',
    menuStatus:false
  },
  mutations: {
    TOKENCHECK: state => {
      state.token = localStorage.getItem('token');
    },
    USERINFO: state => {
      state.user = localStorage.getItem('user');
    },
    LOGINOUT: state => {
      state.user = localStorage.setItem("user","")
      state.token = localStorage.setItem("token","")
    },
    changeMenuStatus: state=>{
      state.menuStatus = !state.menuStatus
    }
  },
  actions: {
    TokenCheck({
      commit
    }) {
      commit('TOKENCHECK')
    },
    userInfo({
      commit
    }) {
      commit('USERINFO')
    },
    loginOut({
      commit
    }){
      commit('LOGINOUT')
    }
  }
}

export default app
