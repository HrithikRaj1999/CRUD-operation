import React from 'react';
import Navbar from './Navbar';
import CourseContextProvider from '../context/CourseContext';

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <CourseContextProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </CourseContextProvider>
  );
};

export default Layout;
