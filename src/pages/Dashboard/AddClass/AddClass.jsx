import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddClass = () => {
  const { axiosSecure } = useAxiosSecure();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /**
   * * Imgbb's API v1
   * * store image in imgbb
   */
  const imgbbAPI = import.meta.env.VITE_IMGBB_API;
  const imgbbAPIUrl = `https://api.imgbb.com/1/upload?key=${imgbbAPI}`;

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    // * Send image to server
    try {
      const res = await fetch(imgbbAPIUrl, {
        method: "POST",
        body: formData,
      });
      const imageData = await res.json();
      if (imageData.success) {
        const imageURL = imageData.data.display_url;
        const { price, image, ...restItem } = data;
        const newClass = {
          ...restItem,
          price: parseFloat(price),
          image: imageURL,
          status: "pending",
          feedback: "",
          enrolledStudents: 0,
        };
        const res = await axiosSecure.post("/classes", newClass);
        console.log("After post new class", res.data);
        if (res.data.insertedId) {
          reset();
          Swal.fire(
            "Save CLass",
            `${data.className} Added successfully`,
            "success"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">Add a Class</h3>
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
                    htmlFor="image"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Class Image
                  </label>
                  <input
                    {...register("image", {
                      required: true,
                      validate: {
                        isImage: (value) =>
                          value[0]?.type.includes("image") ||
                          "Only image files are allowed",
                      },
                    })}
                    id="image"
                    type="file"
                    accept="image/*"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.image && (
                    <span className="text-red-500 text-xs italic">
                      {errors.image.message || "This field is required"}
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
                    id="instructorName"
                    type="text"
                    defaultValue={user?.displayName}
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
                    id="instructorEmail"
                    type="text"
                    defaultValue={user?.email}
                    readOnly
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
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
                  <label
                    htmlFor="details"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Details
                  </label>
                  <textarea
                    {...register("details", { required: true })}
                    id="details"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.details && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddClass;
