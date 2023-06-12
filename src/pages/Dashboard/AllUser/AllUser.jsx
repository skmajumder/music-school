import React from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";

const AllUser = () => {
  return (
    <>
      <PageTitle title={"Manage Users"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">All Users</h3>
        </div>
      </section>
    </>
  );
};

export default AllUser;
