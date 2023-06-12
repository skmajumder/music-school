import React from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";

const ManageClasses = () => {
  return (
    <>
      <PageTitle title={"Manage Classes"} />
      <section className="flex-grow">
        <div className="container mx-auto p-4">
          <h3 className="text-center text-3xl font-medium mb-7">
            Manage Classes
          </h3>
        </div>
      </section>
    </>
  );
};

export default ManageClasses;
