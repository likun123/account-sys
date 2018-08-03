// import Cookies from 'js-cookie'

const app = {
  state: {
    token: '',
    user:''
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
