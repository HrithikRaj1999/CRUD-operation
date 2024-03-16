import React, { useMemo, useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import axios from "axios";
import { ROUTES } from "../util/Routes";

const useFilter = () => {
  const { allCourses, getAllCourse, setAllCourses } = useCourseContext();
  const[defualtValue,setDefaultValue]=useState('')
  const [filter, setFilter] = useState(false);

  const allAuthors = useMemo(
    () => allCourses?.map((course) => course.author),
    [allCourses]
  );

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    try {
      const { data: courses } = await axios.get(
      ROUTES.FILTER_BY_AUTHORS(value)
      );
      setAllCourses([...courses]);
      setFilter(true);
      setDefaultValue(value)
    } catch (error) {
      console.error(error);
      setFilter(false);
    }
  };
  const handleResetAuthorFilter = async () => {
    try {
      await getAllCourse();
      setDefaultValue("")
    } catch (error) {
      console.log(error);
    } finally {
      setFilter(false);
    }
  };
return { filter, allAuthors, handleSelect, defualtValue,handleResetAuthorFilter };
};
export default useFilter;
