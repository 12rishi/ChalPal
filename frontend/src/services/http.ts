import axios from "axios";

export const API: any = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
