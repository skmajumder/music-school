import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useClass from "../../../hooks/useClass";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageClasses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { classes, courseRefetch } = useClass();
  const { axiosSecure } = useAxiosSecure();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClasses = classes.filter(
    (course) =>
      course?.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.instructorEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproved = (courseID, status) => {
    axiosSecure
      .patch(`/classes/status/${courseID}`, {
        status: status,
      })
      .then((res) => {
        console.log("status", res.data);
        if (res.data.modifiedCount > 0) {
          courseRefetch();
          Swal.fire("Update!", `Class ${status}`, "success");
        }
      });
  };

  const handleFeedback = (course) => {
    console.log(course);
  };

  return (
    <>
      <PageTitle title={"Manage Classes"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            Manage Classes
          </h3>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Class, Instructor name or email"
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
                    <th className="py-3 px-6 text-left font-medium">Photo</th>
                    <th className="py-3 px-6 text-left font-medium">Class</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Instructor
                    </th>
                    <th className="py-3 px-6 text-left font-medium">Email</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Available seats
                    </th>
                    <th className="py-3 px-6 text-left font-medium">Price</th>
                    <th className="py-3 px-6 text-left font-medium">Status</th>
                    <th className="py-3 px-6 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {filteredClasses.map((item, index) => (
                    <tr
                      key={item?._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6">
                        <img
                          src={item?.image}
                          alt={item?.className}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="py-4 px-6">{item?.className}</td>
                      <td className="py-4 px-6">{item?.instructorName}</td>
                      <td className="py-4 px-6">{item?.instructorEmail}</td>
                      <td className="py-4 px-6">{item?.availableSeats}</td>
                      <td className="py-4 px-6">{item?.price}</td>
                      <td className="py-4 px-6 capitalize font-medium">
                        {item?.status}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col justify-start items-center gap-2">
                          <button
                            onClick={() =>
                              handleApproved(item?._id, "approved")
                            }
                            disabled={item.status === "approved"}
                            data-tip="Make Approve"
                            className="btn btn-sm capitalize tooltip mr-2 text-green-500 text-[12px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproved(item?._id, "denied")}
                            disabled={item.status === "denied"}
                            data-tip="Make Deny"
                            className="btn btn-sm capitalize tooltip tooltip-left text-red-500 text-[12px]"
                          >
                            Deny
                          </button>
                          <button
                            onClick={() => handleFeedback(item)}
                            data-tip="Give Feedback"
                            className="btn btn-sm capitalize tooltip tooltip-left text-blue-500 text-[12px]"
                          >
                            Feedback
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

export default ManageClasses;
