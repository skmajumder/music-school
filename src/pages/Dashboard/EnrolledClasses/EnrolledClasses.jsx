import React, { useState } from "react";
import { FaSearch, FaShoppingBag, FaTrash } from "react-icons/fa";

const data = [
  {
    image: "https://example.com/image1.jpg",
    className: "Course 1",
    instructor: "John Doe",
    price: "$99",
    startDate: "2023-06-15",
  },
  {
    image: "https://example.com/image2.jpg",
    className: "Course 2",
    instructor: "Jane Smith",
    price: "$149",
    startDate: "2023-07-01",
  },
];

const EnrolledClasses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="mb-4">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search by Course Name or Instructor"
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md p-2 pr-10 w-[50%]"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left">Image</th>
                    <th className="py-3 px-6 text-left">Class Name</th>
                    <th className="py-3 px-6 text-left">Instructor</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-left">Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6">
                        <img
                          src={item.image}
                          alt={item.className}
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="py-4 px-6">{item.className}</td>
                      <td className="py-4 px-6">{item.instructor}</td>
                      <td className="py-4 px-6">{item.price}</td>
                      <td className="py-4 px-6">{item.startDate}</td>
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
