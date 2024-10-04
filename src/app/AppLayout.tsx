import { FC, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <Toaster />
        {children}
      </SessionProvider>
    </>
  );
};

export default AppLayout;
