import axios from "axios"

const axiosClient = axios.create({
  baseURL: "http://api:5000",
})

export default axiosClient
