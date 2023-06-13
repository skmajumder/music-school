import React, { useState } from "react";
import { FaMoneyCheck, FaShoppingBag, FaTrash } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useLoginUser from "../../../hooks/useLoggedUser";
import Swal from "sweetalert2";
import axios from "axios";

const SelectedClasses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { carts, refetch } = useCart();
  const { loginUser } = useLoginUser();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = carts.filter(
    (item) =>
      (item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      item?.status === "pending"
  );

  const totalPrice = filteredData.reduce(
    (sum, currentValue) => sum + currentValue.price,
    0
  );

  const handleDelete = (course, email) => {
    Swal.fire({
      title: `Want to delete ${course.name} class?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/carts/${course._id}`, {
            params: {
              email: email,
            },
          })
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                `${course.name} class has been deleted.`,
                "success"
              );
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Error occurred during delete request: ${error.message}`,
            });
          });
      }
    });
  };

  const handlePay = (index) => {};

  return (
    <>
      <PageTitle title={"Selected Classes"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            Selected Classes
          </h3>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Course Name or Instructor"
                value={searchTerm}
                onChange={handleSearch}
                className="text-[12px] border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md p-2 pr-10 w-[50%]"
              />
              <p className="right-3 text-gray-400">
                Total Price: {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left font-medium">#</th>
                    <th className="py-3 px-6 text-left font-medium">Image</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Class Name
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Instructor
                    </th>
                    <th className="py-3 px-6 text-left font-medium">Price</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Start Date
                    </th>
                    <th className="py-3 px-6 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {filteredData.map((item, index) => (
                    <tr
                      key={item?._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="py-4 px-6">{item?.name}</td>
                      <td className="py-4 px-6">{item?.instructor}</td>
                      <td className="py-4 px-6">{item?.price}</td>
                      <td className="py-4 px-6">{item?.startDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col justify-center items-center gap-2">
                          <button
                            onClick={() => handleDelete(item, loginUser.email)}
                            className="mr-2 text-red-500 hover:text-red-700 font-medium btn btn-sm capitalize text-[14px]"
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() => handlePay(item?._id)}
                            className="text-green-500 hover:text-green-700 font-medium btn btn-sm capitalize text-[14px]"
                          >
                            <FaMoneyCheck />
                            <span>Pay</span>
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

export default SelectedClasses;
