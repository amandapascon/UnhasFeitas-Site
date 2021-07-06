import axios from 'axios'

const api = axios.create({baseURL: 'https://unhasfeitas.herokuapp.com'})

export default api;