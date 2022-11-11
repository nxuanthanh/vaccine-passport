import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => axiosClient.get("user"),
  create: (params) => axiosClient.post("user", params),
  getOne: (userId) => axiosClient.get(`user/${userId}`),
  update: (userId, params) => axiosClient.put(`user/${userId}`, params),
  vaccinated: (params) => axiosClient.post("user/vaccinated", params),
};

export default userApi;
