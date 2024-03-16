import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CreateCourseResponse } from "../Components/CreateCourseForm";

interface CreateCourseContexType {
  allCourses: CreateCourseResponse[];
  setAllCourses: React.Dispatch<React.SetStateAction<CreateCourseResponse[]>>;
}
const CourseContext = createContext({} as CreateCourseContexType);
const CourseContextProvider = ({ children }: PropsWithChildren) => {
  const [allCourses, setAllCourses] = useState<CreateCourseResponse[]>([
    {
      _id: "",
      thumbnail: "",
      name: "",
      author: "",
      description: "",
    },
  ]);

  return (
    <CourseContext.Provider value={{ allCourses, setAllCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
export const useCourseContext = () => useContext(CourseContext);

export default CourseContextProvider;
