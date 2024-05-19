import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBlogApi, updateBlogApi } from "../../services/api/blog";
import { subscribeWithSelector } from "zustand/middleware";

const CreateBlog = ({ closeModal, refresh, blogData }) => {
  const intialFormState = {
    subTitle: blogData?.subTitle ?? "",
    title: blogData?.title ?? "",
    categories: blogData?.categories ?? "",
    description: blogData?.description ?? "",
  };

  const [blogImg, setBlogImg] = useState(null);
  const [formData, setFormData] = useState(intialFormState);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileHandler = (e) => {
    setBlogImg(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { subTitle, title, categories, description } = formData;

    try {
      let res = null;
      if (!blogData) {
        const payload = new FormData();
        payload.append("title", title);
        payload.append("subTitle", subTitle);
        payload.append("categories", categories);
        payload.append("description", description);
        payload.append("file", blogImg);
        res = await createBlogApi(payload);
      } else {
        res = await updateBlogApi({
          title,
          subTitle,
          description,
          id: blogData._id,
        });
      }

      if (res?.success) {
        toast.success("Blog created successfully");
        closeModal();
        refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="card-body p-md-5 text-black" onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                id="form3Example1m"
                name="title"
                onChange={onChangeHandler}
                value={formData.title}
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="form3Example1m">
                Title
              </label>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="form-outline">
              <input
                type="text"
                name="subTitle"
                onChange={onChangeHandler}
                value={formData.subTitle}
                id="form3Example1n"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="form3Example1n">
                Sub-Title
              </label>
            </div>
          </div>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            name="description"
            onChange={onChangeHandler}
            value={formData.description}
            id="form3Example97"
            className="form-control form-control-lg"
          />
          <label className="form-label" htmlFor="form3Example97">
            Description
          </label>
        </div>

        <div className="form-outline mb-4">
          <select
            className="form-select form-control-lg"
            id="form3Example8"
            name="categories"
            value={formData.categories}
            onChange={onChangeHandler}
            aria-label="Default select example"
          >
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            <option value="fitnessHealth">Fitness and Health</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="parenting">Parenting</option>
            <option value="entertainment">Entertainment</option>
            <option value="selfImprovement">Self-Improvement</option>
            <option value="personalfinance">Personal Finance</option>
            <option value="foodCooking">Food and Cooking</option>
          </select>
          <label className="form-label" htmlFor="form3Example8">
            Categories
          </label>
        </div>

        {!blogData ? (
          <div className="form-outline mb-4">
            <input
              type="file"
              onChange={onFileHandler}
              id="form3Example97"
              className="form-control form-control-lg"
            />
            <label className="form-label" htmlFor="form3Example97">
              Image
            </label>
          </div>
        ) : (
          ""
        )}

        <div className="d-flex justify-content-end pt-3">
          <button
            type="reset"
            className="btn btn-light btn-lg"
            onClick={() => setFormData(intialFormState)}
          >
            Reset all
          </button>
          <button type="submit" className="btn btn-warning btn-lg ms-2">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
