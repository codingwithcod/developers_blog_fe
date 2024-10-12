import { FC, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        // disableTransitionOnChange
      >
        <Navbar />
        <Toaster />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default AppLayout;
