import React, { useState } from "react";
import useCart from "../../../hooks/useCart";
import PageTitle from "../../../components/PageTitle/PageTitle";

const EnrolledClasses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { carts } = useCart();
  console.log(carts);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = carts.filter(
    (item) =>
      (item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.instructor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      item?.status === "approved"
  );

  return (
    <>
      <PageTitle title={"Enrolled Classes"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            My Enrolled Classes
          </h3>
          <div className="mb-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by Course Name or Instructor"
                value={searchTerm}
                onChange={handleSearch}
                className="text-[12px] border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md p-2 pr-10 w-[50%]"
              />
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

export default EnrolledClasses;
