import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { useForm } from "react-hook-form";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Payment = () => {
  const { user } = useAuth();
  const { id: classID } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const { carts, refetch } = useCart();
  const [course, setCourse] = useState({});

  console.log(course);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const findCourse = carts.find((c) => c._id === classID);
    setCourse(findCourse);
  }, [classID]);

  useEffect(() => {
    let defaultValues = {};
    reset({ ...defaultValues });
  }, [course]);

  const onSubmit = (data) => {
    const { price, ...restItem } = data;
    const orderInfo = {
      ...restItem,
      price: parseFloat(data.price),
      studentName: user.displayName,
      cartID: course?._id,
      courseID: course?.courseID,
    };
    console.log("orderInfo", orderInfo);

    axiosSecure
      .post(`/order/${classID}`, orderInfo)
      .then((res) => {
        if (res.data) {
          window.location.replace(res.data.url);
          refetch();
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PageTitle title={"Payment"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            Payment for Class: {course?.name}
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-hidden">
              <form
                className="max-w-lg mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-2xl font-bold mb-4">{course?.name}</h2>
                <div className="mb-4">
                  <label
                    htmlFor="courseName"
                    className="block mb-2 font-medium"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    defaultValue={course?.name}
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                    {...register("courseName")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="courseInstructor"
                    className="block mb-2 font-medium"
                  >
                    Course Instructor
                  </label>
                  <input
                    type="text"
                    id="courseInstructor"
                    defaultValue={course?.instructor}
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                    {...register("courseInstructor")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="studentEmail"
                    className="block mb-2 font-medium"
                  >
                    Student Email
                  </label>
                  <input
                    type="email"
                    id="studentEmail"
                    defaultValue={course?.email}
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                    {...register("studentEmail")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block mb-2 font-medium">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    defaultValue={course?.price}
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                    {...register("price")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block mb-2 font-medium">
                    Start Date
                  </label>
                  <input
                    type="text"
                    id="startDate"
                    defaultValue={course?.startDate}
                    readOnly
                    className="w-full px-4 py-2 border rounded bg-gray-100"
                    {...register("startDate")}
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded"
                >
                  Pay ${course?.price}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
