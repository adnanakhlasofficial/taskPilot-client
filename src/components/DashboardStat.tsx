"use client";
import React from "react";
import Image from "next/image";
import logoMeter from "@/assects/meter-dashboard.jpg";
import emService from "@/assects/emSelf-Service.jpg";
import emManagement from "@/assects/employee-management-3.jpg";
import Link from "next/link";

const DashboardStat = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-0 lg:w-10/12 xl:w-9/12 mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Card */}
        <Link href={"/dashboard"}>
          <div className="card bg-base-100 w-full shadow-md transition-transform hover:scale-105 aspect-square">
            <figure className="w-full overflow-hidden bg-white aspect-s">
              <Image
                src={logoMeter}
                alt="Meter Dashboard"
                width={500}
                height={300}
                className="rounded w-full object-cover "
              />
            </figure>
            <div className="card-body p-4 bg-white">
              <h2 className="text-xl md:text-2xl font-semibold text-center">
                Dashboard
              </h2>
            </div>
          </div>
        </Link>

        {/* Second Card */}
        <div className="card bg-base-100 w-full shadow-md transition-transform hover:scale-105 aspect-square">
          <figure className="w-full overflow-hidden bg-white aspect-s">
            <Image
              src={emManagement}
              alt="Employee Management"
              width={500}
              height={300}
              className="rounded w-full object-cover "
            />
          </figure>
          <div className="card-body p-4 bg-white">
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              Team Management
            </h2>
          </div>
        </div>

        {/* Third Card */}
        <div className="card bg-base-100 w-full shadow-md transition-transform hover:scale-105 aspect-square">
          <figure className="w-full overflow-hidden bg-white aspect-s">
            <Image
              src={emService}
              alt="Employee Self Service"
              width={500}
              height={300}
              className="rounded w-full object-cover "
            />
          </figure>
          <div className="card-body p-4 bg-white">
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              Project Management
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStat;
