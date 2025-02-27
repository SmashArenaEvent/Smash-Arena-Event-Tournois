import axios from "axios"

export const CHALLONGE_API = axios.create({
  baseURL: 'http://localhost:3000'
})