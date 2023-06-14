import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useClass from "../../../hooks/useClass";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";

const ManageClasses = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { classes, courseRefetch } = useClass();
  const { axiosSecure } = useAxiosSecure();
  const [modalClass, setModalClass] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        email: user.email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          courseRefetch();
          Swal.fire("Update!", `Class ${status}`, "success");
        }
      });
  };

  const handleFeedback = (course) => {
    setModalClass(course);
    window.my_modal_2.showModal();
  };

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/classes/feedback/${modalClass?._id}`, {
        feedback: data.feedback,
        email: user.email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          courseRefetch();
          reset();
          Swal.fire(
            "Done!",
            `${modalClass.className} class Feedback done`,
            "success"
          );
        }
      });
    closeModal();
  };

  // Close the modal
  const closeModal = () => {
    window.my_modal_2.close();
  };

  return (
    <>
      <PageTitle title={"Manage Classes"} />
      <dialog id="my_modal_2" className="modal">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="modal-box"
        >
          <p className="py-4">Press ESC key or click outside to close</p>
          <div className="space-y-2 mb-2">
            <p>Class: {modalClass.className}</p>
            {modalClass.status === "approved" && (
              <>
                Status:{" "}
                <p className="badge badge-success uppercase text-white">
                  {modalClass.status}
                </p>
              </>
            )}
            {modalClass.status === "denied" && (
              <>
                Status:{" "}
                <p className="badge badge-error uppercase text-white">
                  {modalClass.status}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="feedback" className="text-sm font-bold">
              Feedback
            </label>
            <textarea
              {...register("feedback", { required: true })}
              id="feedback"
              rows="5"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={`Please write the ${modalClass.status} reason`}
            ></textarea>
            {errors.feedback && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
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
                            disabled={
                              item.status === "approved" ||
                              item.status === "denied"
                            }
                            data-tip="Make Approve"
                            className="btn btn-sm capitalize tooltip mr-2 text-green-500 text-[12px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproved(item?._id, "denied")}
                            disabled={
                              item.status === "approved" ||
                              item.status === "denied"
                            }
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
