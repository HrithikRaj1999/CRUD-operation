import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateCourseResponse } from "../Components/CreateCourseForm";
import axios from "axios";

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
  async function getAllCourse() {
    try {
      const { data: courses } = await axios.get<CreateCourseResponse[]>(
        `${process.env.REACT_APP_SERVER_URL}/course/fetch-all-course`
      );
      setAllCourses([...courses]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAllCourse();
  }, []);
  return (
    <CourseContext.Provider value={{ allCourses, setAllCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
export const useCourseContext = () => useContext(CourseContext);

export default CourseContextProvider;
