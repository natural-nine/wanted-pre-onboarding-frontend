import axios from "axios";

const instance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
});

const token = localStorage.getItem("userToken");

// instance.defaults.headers.common['Authorization'] = token
//   ? `Bearer ${token}`
//   : null;

export default instance;
