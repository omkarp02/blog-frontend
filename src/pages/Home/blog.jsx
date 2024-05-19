import React, { useEffect, useState } from "react";
import "./index.css";
import { deleteBlogApi, getBlogDataApi } from "../../services/api/blog";
import CreateBlog from "./createBlog";
import useAuthStore from "../../services/store/authStore";

const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [blogList, setBlogList] = useState([]);
  const user = useAuthStore((state) => state.user);

  async function getBlogs() {
    const data = await getBlogDataApi();
    if (data.success) {
      setBlogList(data.data);
    }
  }

  const deleteBlog = async (id, index) => {
    const data = await deleteBlogApi(id);
    if (data.success) {
      setBlogList((prev) => {
        const newBlogList = [...prev];
        newBlogList.splice(index, 1);
        return newBlogList;
      });
      toast.success("Blog deleted successfully");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const editHandler = (data) => {
    setBlogData(data);
    setShowModal(true);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <main className="container" style={{ marginTop: "100px" }}>
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark w-100 position-relative">
          <img src="bg1.jpg" className="blog-banner" />

          <div
            className="col-md-6 px-0 text-black position-relative"
            style={{ zIndex: 5 }}
          >
            <h1 className="display-4 fst-italic">
              Title of a longer featured blog post
            </h1>
            <p className="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what’s most interesting in this
              post’s contents.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
                setBlogData(null)
              }}
              className="btn btn-outline-dark mx-2 btn-circle btn-lg btn-circle ml-2"
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="row mb-2" style={{ height: "250px" }}>
          {blogList.map((ele, i) => (
            <div className="col-md-6" key={ele._id}>
              <div className="d-flex h-100 main-card ">
                <section className="section1 position-relative">
                  <strong className="d-inline-block mb-2 text-primary">
                    {ele.title}
                  </strong>
                  <h3 className="mb-0">{ele.subTitle}</h3>
                  <div className="mb-1 text-muted">Nov 12</div>
                  <p className="card-text mb-auto">
                    {ele.description.length > 200
                      ? `${ele.description.slice(0, 200)}...`
                      : ele.description}
                  </p>
                  <div
                    className="d-flex position-absolute top-0"
                    style={{ height: "50px", right: 0 }}
                  >
                    {user.role === "admin" ? (
                      <button
                        type="button"
                        className="btn btn-outline-danger mx-2 btn-circle btn-circle ml-2 py-0"
                        style={{ height: "40px" }}
                        onClick={() => deleteBlog(ele._id, i)}
                      >
                        <i className="fa fa-trash "></i>{" "}
                      </button>
                    ) : (
                      ""
                    )}
                    {user._id === ele.userId ? (
                      <button
                        type="button"
                        onClick={() => editHandler(ele)}
                        style={{ height: "40px" }}
                        className="btn btn-outline-primary btn-circle mx-2  btn-circle ml-2 py-0"
                      >
                        <i className="fa fa-edit"></i>{" "}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </section>
                <section className="section2">
                  <img src={ele.imgLink} className="section-img" />
                </section>
              </div>
            </div>
          ))}
        </div>
      </main>
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{blogData ? 'Edit Blog' : 'Create Blog'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <CreateBlog closeModal={handleCloseModal} refresh={getBlogs} blogData={blogData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
