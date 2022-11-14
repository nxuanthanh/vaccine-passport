import axiosClient from "./axiosClient";

const vaccineLotApi = {
  create: (params) => axiosClient.post("vaccine/lots", params),
  getOne: (id) => axiosClient.get(`vaccine/lots/${id}`),
  update: (id, params) => axiosClient.put(`vaccine/lots/${id}`, params),
  delete: (id) => axiosClient.delete(`vaccine/lots/${id}`),
};

export default vaccineLotApi;
