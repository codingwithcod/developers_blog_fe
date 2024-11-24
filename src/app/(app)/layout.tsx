import React, { FC } from "react";
import AppLayout from "./AppLayout";

interface IProps {
  children: React.ReactNode;
}

const RootAppLayout: FC<IProps> = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default RootAppLayout;
