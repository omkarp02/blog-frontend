import React, { useEffect, useState } from "react";
import "./index.css";
import { deleteUserApi, findOneUserApi, getUserDataApi } from "../../services/api/user";
import { toast } from "react-toastify";
import EditForm from "./editForm";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)

  const getAllUserDataFn = async () => {
    const data = await getUserDataApi();
    if (data.success) {
      setUserList(data.data);
    }
  };

  const deleteUser = async (id, index) => {
    const data = await deleteUserApi(id);
    if (data.success) {
      setUserList((prev) => {
        const newUserList = [...prev];
        newUserList.splice(index, 1);
        return newUserList;
      });
      toast.success("User deleted successfully");
    }
  };

  const findOneUser = async (id) => {
    const data = await findOneUserApi(id)
    if(data.success){
      setSelectedUser(data.data)
    }
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  useEffect(() => {
    getAllUserDataFn();
  }, []);

  return (
    <>
      <main
        className="table"
        id="customers_table"
        style={{ marginTop: "100px" }}
      >
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th> Id</th>
                <th> Name</th>
                <th> Email Id</th>
                <th> Gender</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((ele, i) => {
                return (
                  <tr key={ele._id}>
                    <td> {i + 1} </td>
                    <td> {ele.name}</td>
                    <td> {ele.email}</td>
                    <td> {ele.gender} </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger mx-2 btn-circle btn-lg btn-circle ml-2"
                        onClick={() => deleteUser(ele._id, i)}
                      >
                        <i className="fa fa-trash "></i>{" "}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-circle btn-lg btn-circle ml-2"
                        onClick={()=> findOneUser(ele._id)}
                      >
                        <i className="fa fa-edit"></i>{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* Additional table rows */}
            </tbody>
          </table>
        </section>
      </main>

      {selectedUser && (
        <div className={`modal fade ${selectedUser ? 'show' : ''}`} style={{ display: selectedUser ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                  <EditForm selectedUser={selectedUser} closeModal={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
