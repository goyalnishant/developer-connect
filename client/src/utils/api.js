import axios from "axios";

export default axios.create({
  baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:5000' : 'https://node-dev-connect.herokuapp.com',
  responseType: "json"
});