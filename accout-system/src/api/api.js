//服务器接口地址
const Host = 'http://localhost:3000'

const getHospitals = Host+'/Hospitals'
const getSubHospitals = Host+'/SubHospitals/'
const getAllSubHospitals = Host+'/AllSubHospitals/'
const getServices = Host+'/services'
const getRecords = Host+'/records'
const login = Host+'/users/login'
const register = Host+'/users'
const updateHospitals = Host+'/SubHospitals/'
const delHospitals = Host+'/SubHospitals/'
const addHospitals = Host+'/addSubHospitals/'
const search = Host+'/search'
export {
    getHospitals,
    getSubHospitals,
    getAllSubHospitals,
    getServices,
    getRecords,
    login,
    register,
    updateHospitals,
    delHospitals,
    addHospitals,
    search
}