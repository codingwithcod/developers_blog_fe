import { Metadata } from "next";
import React from "react";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Developers Blog",
  description: "Manage blogs, users and more from developers blog admin dashboard .",
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
