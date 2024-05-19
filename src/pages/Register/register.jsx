import React, { useState } from "react";
import "./index.css";
import axiosInstance from "../../services/api/instance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const intialFormState = {
  firstName: "",
  lastName: "",
  address: "",
  gender: "",
  email: "",
  password: "",
};

function RegistrationForm() {
  const [formData, setFormData] = useState(intialFormState);
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { firstName, lastName, address, gender, email, password } =
        formData;
      const payload = {
        name: `${firstName} ${lastName}`,
        address,
        gender,
        email,
        password,
      };
      const res = await axiosInstance.post("user/register", payload);
      if (res.success) {
        navigate("/login")
        setFormData(intialFormState)
        toast.success('User registered successfully')
      }
    } catch (error) {}
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div
                  className="col-xl-6 d-none d-xl-block"
                  style={{ height: "80vh" }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample"
                    className="h-100"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem",
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <form
                    className="card-body p-md-5 text-black"
                    onSubmit={onSubmitHandler}
                  >
                    <h3 className="mb-5 text-uppercase">
                      Blog registration form
                    </h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1m"
                            name="firstName"
                            onChange={onChangeHandler}
                            value={formData.firstName}
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1m"
                          >
                            First name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            name="lastName"
                            onChange={onChangeHandler}
                            value={formData.lastName}
                            id="form3Example1n"
                            className="form-control form-control-lg"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1n"
                          >
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example8"
                        name="address"
                        onChange={onChangeHandler}
                        value={formData.address}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="form3Example8">
                        Address
                      </label>
                    </div>

                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Gender: </h6>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="femaleGender"
                          value="female"
                          onChange={onChangeHandler}
                          name="gender"
                          checked={formData.gender === "female"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="femaleGender"
                        >
                          Female
                        </label>
                      </div>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="maleGender"
                          value="male"
                          onChange={onChangeHandler}
                          name="gender"
                          checked={formData.gender === "male"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="maleGender"
                        >
                          Male
                        </label>
                      </div>

                      <div className="form-check form-check-inline mb-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="otherGender"
                          value="others"
                          onChange={onChangeHandler}
                          name="gender"
                          checked={formData.gender === "others"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="otherGender"
                        >
                          Other
                        </label>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="email"
                        onChange={onChangeHandler}
                        value={formData.email}
                        id="form3Example97"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Email ID
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        onChange={onChangeHandler}
                        value={formData.password}
                        id="form3Example97"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="form3Example97">
                        Password
                      </label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="reset"
                        className="btn btn-light btn-lg"
                        onClick={() => setFormData(intialFormState)}
                      >
                        Reset all
                      </button>
                      <button
                        type="submit"
                        className="btn btn-warning btn-lg ms-2"
                      >
                        Submit form
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm;
