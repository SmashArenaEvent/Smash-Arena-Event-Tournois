import axios from "axios";

export const CHALLONGE_API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
});
