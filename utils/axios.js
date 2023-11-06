import axios from "axios"

export const CHALLONGE_API = axios.create({
  baseURL: import.meta.env.CHALLONGE_API_URL
})