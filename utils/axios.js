import axios from "axios";

export const CHALLONGE_API = axios.create({
  baseURL: "https://smash-arena-event-tournois.onrender.com/api/tournaments",
});
