import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useUser from "../../../hooks/useUser";
import { FaUserShield, FaUserTie } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const AllUser = () => {
  const { users, loading, refetch } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMakeAdmin = (user) => {
    axios
      .patch(`http://localhost:3000/users/${user._id}`, {
        role: "admin",
      })
      .then((response) => {
        refetch();
        Swal.fire(
          "Successful!",
          `${user.name} role change to admin successfully`,
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error updating ${user} role to Admin: ${error.message}`,
        });
      });
  };

  const handleMakeInstructor = (user) => {
    axios
      .patch(`http://localhost:3000/users/${user._id}`, {
        role: "instructor",
      })
      .then((response) => {
        refetch();
        Swal.fire(
          "Successful!",
          `${user.name} role change to instructor successfully`,
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error updating ${user} role to Admin: ${error.message}`,
        });
      });
  };

  return (
    <>
      <PageTitle title={"Manage Users"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">All Users</h3>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Name or Email..."
                value={searchTerm}
                onChange={handleSearch}
                className="text-[12px] border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md px-2 py-4 pr-10 w-[50%]"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left font-medium">#</th>
                    <th className="py-3 px-6 text-left font-medium">Photo</th>
                    <th className="py-3 px-6 text-left font-medium">Name</th>
                    <th className="py-3 px-6 text-left font-medium">Email</th>
                    <th className="py-3 px-6 text-left font-medium">Role</th>
                    <th className="py-3 px-6 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {filteredUsers.map((item, index) => (
                    <tr
                      key={item?._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">
                        <img
                          src={item?.photo}
                          alt={item?.name}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="py-4 px-6">{item?.name}</td>
                      <td className="py-4 px-6">{item?.email}</td>
                      <td className="py-4 px-6 capitalize">{item?.role}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-start items-center gap-2">
                          <button
                            data-tip="Make Admin"
                            onClick={() => handleMakeAdmin(item)}
                            className="capitalize tooltip mr-2 text-blue-500 btn btn-outline btn-sm text-[16px]"
                            disabled={item.role === "admin"}
                          >
                            <FaUserShield />
                          </button>
                          <button
                            data-tip="Make Instructions"
                            onClick={() => handleMakeInstructor(item)}
                            className="capitalize tooltip tooltip-left text-green-500 btn btn-outline btn-sm text-[16px]"
                            disabled={item.role === "instructor"}
                          >
                            <FaUserTie />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllUser;
