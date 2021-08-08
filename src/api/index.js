import axios from 'axios'

export const server = axios.create({
  baseURL: "https://unhas-feitas-server.herokuapp.com/",
})