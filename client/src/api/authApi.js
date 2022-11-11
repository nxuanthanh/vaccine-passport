import axiosClient from "./axiosClient";

const authApi = {
  login: (params) => axiosClient.post("admin/login", params),

  checktoken: () => axiosClient.post("admin/check-token"),
};

export default authApi;
