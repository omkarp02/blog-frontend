import React, { useState } from "react";
import { resetUserPasswordApi } from "../../services/api/user";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await resetUserPasswordApi(formData);
      if (res.success) {
        toast.success("Password Changed successfully");
      }
    } catch (error) {}
  };

  return (
    <div className="col-md-6 offset-md-3">
      <span className="anchor" id="formChangePassword"></span>
      <hr className="mb-5" />

      {/* Form card change password */}
      <div className="card card-outline-secondary">
        <div className="card-header">
          <h3 className="mb-0">Change Password</h3>
        </div>
        <div className="card-body">
          <form
            className="form"
            role="form"
            onSubmit={onSubmitHandler}
            autoComplete="off"
          >
            <div className="form-group">
              <label htmlFor="inputPasswordNew">Old Password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                onChange={onChangeHandler}
                value={formData.oldPassword}
                id="inputPasswordNew"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPasswordNewVerify">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                onChange={onChangeHandler}
                value={formData.newPassword}
                id="inputPasswordNewVerify"
                required
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-lg float-right"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /form card change password */}
    </div>
  );
};

export default ResetPassword;
