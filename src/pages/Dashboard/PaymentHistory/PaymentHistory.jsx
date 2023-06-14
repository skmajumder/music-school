import React, { useState } from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useOrders from "../../../hooks/useOrders";
const data = [
  {
    transactionId: "T123456789",
    paymentName: "Payment 1",
    price: 99,
    date: "2023-06-15",
    courseName: "Course 1",
  },
  {
    transactionId: "T987654321",
    paymentName: "Payment 2",
    price: 149,
    date: "2023-07-01",
    courseName: "Course 2",
  },
];

const PaymentHistory = () => {
  const { orders, ordersRefetch } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(orders);

  const totalPrice = data.reduce(
    (sum, currentValue) => sum + currentValue.price,
    0
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter payment history based on search term
  const filteredData = data.filter(
    (item) =>
      item.paymentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort payment history by date in descending order
  const sortedData = filteredData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <PageTitle title={"Payment History"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            Payment History
          </h3>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Payment Name or Course Name or Transaction Id"
                value={searchTerm}
                onChange={handleSearch}
                className="text-[12px] border border-gray-300 focus:ring-1 focus:ring-blue-500 rounded-md p-2 pr-10 w-[50%]"
              />
              <p className="right-3 text-gray-400">
                Total Pay: {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-6 text-left font-medium">#</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Transaction ID
                    </th>
                    <th className="py-3 px-6 text-left font-medium">
                      Payment Name
                    </th>
                    <th className="py-3 px-6 text-left font-medium">Price</th>
                    <th className="py-3 px-6 text-left font-medium">Date</th>
                    <th className="py-3 px-6 text-left font-medium">
                      Course Name
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {sortedData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{item.transactionId}</td>
                      <td className="py-4 px-6">{item.paymentName}</td>
                      <td className="py-4 px-6">{item.price}</td>
                      <td className="py-4 px-6">{item.date}</td>
                      <td className="py-4 px-6">{item.courseName}</td>
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

export default PaymentHistory;
