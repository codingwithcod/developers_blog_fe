import { FC, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Toaster />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
