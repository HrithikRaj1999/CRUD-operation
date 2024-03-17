import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { CreateCourseResponse } from "../util/types";
import { ROUTES } from "../util/Routes";
import { useLocation } from "react-router-dom";

interface CreateCourseContexType {
  loading: boolean;
  setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
  allCourses: CreateCourseResponse[] | undefined | null;
  setAllCourses: React.Dispatch<
    React.SetStateAction<CreateCourseResponse[] | undefined | null>
  >;
  getAllCourse: () => Promise<void>;
}
const CourseContext = createContext({} as CreateCourseContexType);
const CourseContextProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState<CreateCourseResponse[] | null>();
  async function getAllCourse() {
    try {
      const { data: courses } = await axios.get<CreateCourseResponse[]>(
        ROUTES.FETCH_ALL
      );
      setAllCourses([...courses]);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (location.pathname === "/") getAllCourse();
  }, [location.pathname]);
  return (
    <CourseContext.Provider
      value={{ allCourses, setAllCourses, loading, setLoading, getAllCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};
export const useCourseContext = () => useContext(CourseContext);

export default CourseContextProvider;
