import React, { useState } from "react";
import useClass from "../../../hooks/useClass";
import useAuth from "../../../hooks/useAuth";
import { FaPenSquare } from "react-icons/fa";

const MyClasses = () => {
  const { user } = useAuth();
  const { classes, courseRefetch } = useClass();
  const [searchTerm, setSearchTerm] = useState("");

  const allClasses = classes.filter(
    (course) => course.instructorEmail === user?.email
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredClasses = allClasses?.filter(
    (course) =>
      course?.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.price.toString().includes(searchTerm)
  );

  return (
    <>
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">My Classes</h3>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Class name, price or status"
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
                      Available seats
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Enrolled
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
                      <td className="py-4 px-6">{item?.availableSeats}</td>
                      <td className="py-4 px-6">{item?.enrolledStudents}</td>
                      <td className="py-4 px-6">{item?.price}</td>
                      <td className="py-4 px-6 capitalize font-medium">
                        {item?.status}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col justify-start items-center gap-2">
                          <button
                            data-tip="Update Class"
                            className="tooltip tooltip-top capitalize text-teal-700"
                          >
                            <FaPenSquare className="h-6 w-6" />
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

export default MyClasses;
