import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useClass from "../../../hooks/useClass";

const UpdateClass = () => {
  const { user } = useAuth();
  const { id: classID } = useParams();
  const { courseRefetch } = useClass();
  const { axiosSecure } = useAxiosSecure();
  const [classInfo, setClassInfo] = useState({});

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axiosSecure.get(`/classes/${classID}`, {
          params: {
            email: user.email,
          },
        });
        setClassInfo(response.data);
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };
    fetchClass();
  }, [classID]);

  useEffect(() => {
    let defaultValues = {};
    reset({ ...defaultValues });
  }, [classInfo]);

  const onSubmit = (data) => {
    const { availableSeats, price, ...restItem } = data;
    const updateCourse = {
      ...restItem,
      availableSeats: Number(data.availableSeats),
      price: parseFloat(data.price),
    };
    console.log(updateCourse);
    axiosSecure
      .patch(`/classes/update/${classID}`, updateCourse)
      .then((res) => {
        console.log("status", res.data);
        if (res.data.modifiedCount > 0) {
          courseRefetch();
          Swal.fire("Update!", `Class update`, "success");
          navigate("/dashboard/my-classes");
        }
      });
  };

  return (
    <>
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            Update {classInfo.className} Class
          </h3>
          <div className="overflow-x-auto shadow-lg">
            <div className="min-w-full overflow-hidden">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-slate-600 p-10"
              >
                <div className="mb-4">
                  <label
                    htmlFor="className"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Class Name
                  </label>
                  <input
                    {...register("className", { required: true })}
                    defaultValue={classInfo.className}
                    id="className"
                    type="text"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.className && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="instructorName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Instructor Name
                  </label>
                  <input
                    {...register("instructorName")}
                    defaultValue={classInfo.instructorName}
                    id="instructorName"
                    type="text"
                    readOnly
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="instructorEmail"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Instructor Email
                  </label>
                  <input
                    {...register("instructorEmail")}
                    defaultValue={classInfo.instructorEmail}
                    id="instructorEmail"
                    type="text"
                    readOnly
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="details"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Details
                  </label>
                  <textarea
                    {...register("details", { required: true })}
                    defaultValue={classInfo.details}
                    id="details"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.details && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="availableSeats"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Available Seats
                  </label>
                  <input
                    {...register("availableSeats", { required: true })}
                    defaultValue={classInfo.availableSeats}
                    id="availableSeats"
                    type="number"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.availableSeats && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Price
                  </label>
                  <input
                    {...register("price", { required: true })}
                    defaultValue={classInfo.price}
                    id="price"
                    type="number"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Start Date
                  </label>
                  <input
                    {...register("startDate", { required: true })}
                    defaultValue={classInfo.startDate}
                    id="startDate"
                    type="date"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.startDate && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <button type="submit" className="btn btn-primary">
                    Update Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateClass;
