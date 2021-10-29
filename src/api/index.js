import axios from 'axios'

export const server = axios.create(
    {baseURL: "https://unhas-feitas-api.herokuapp.com/"
})

/* export const server = axios.create(
    {baseURL: "http://localhost:8080"
})
 */