import React, { useState } from "react";
import useCart from "../../../hooks/useCart";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useOrders from "../../../hooks/useOrders";

const EnrolledClasses = () => {
  const { orders, ordersRefetch } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  const enrolled = orders.filter((c) => c.paidStatus === true);

  console.log(enrolled);

  const filteredData = enrolled;

  return (
    <>
      <PageTitle title={"Enrolled Classes"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            My Enrolled Classes
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left font-medium">#</th>
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
                      <td className="py-4 px-6">{item?.courseName}</td>
                      <td className="py-4 px-6">{item?.courseInstructor}</td>
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
