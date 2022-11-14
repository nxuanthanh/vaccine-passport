import axiosClient from "./axiosClient";

const placeApi = {
  getAll: () => axiosClient.get("user"),
  getOne: (id) => axiosClient.get(`user/${id}`),
};

export default placeApi;
