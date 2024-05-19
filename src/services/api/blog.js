import axiosInstance from "./instance";

export const getBlogDataApi = async () => {
  return await axiosInstance.get("blog/find");
};

export const createBlogApi = async (data) => {
  return await axiosInstance.post("blog/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBlogApi = async (id) => {
  return await axiosInstance.delete(`blog/delete/${id}`);
};

export const findOneBlogApi = async (id) => {
  return await axiosInstance.get(`blog/find-one/${id}`);
};

export const updateBlogApi = async (payload) => {
  return await axiosInstance.put(`blog/update`, payload);
};
