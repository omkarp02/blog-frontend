import axiosInstance from "./instance";

export const getUserDataApi = async () => {
  return await axiosInstance.get("user/find-all");
};

export const deleteUserApi = async (id) => {
  return await axiosInstance.delete(`user/delete/${id}`);
};

export const findOneUserApi = async (id) => {
  return await axiosInstance.get(`user/find-one/${id}`);
};

export const resetUserPasswordApi = async (data) => {
  return await axiosInstance.post(`user/reset-password`, data);
};

export const updateUserApi = async (payload) => {
  return await axiosInstance.put(`user/update`, payload);
};
