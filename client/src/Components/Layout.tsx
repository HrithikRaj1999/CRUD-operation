import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import CourseContextProvider from "../context/CourseContext";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <CourseContextProvider>
      <Navbar />
      {children}
    </CourseContextProvider>
  );
};

export default Layout;
