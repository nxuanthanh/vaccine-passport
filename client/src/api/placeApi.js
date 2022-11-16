import axiosClient from "./axiosClient";

const placeApi = {
  getAll: () => axiosClient.get("place"),
  getOne: (id) => axiosClient.get(`place/${id}`),
};

export default placeApi;
