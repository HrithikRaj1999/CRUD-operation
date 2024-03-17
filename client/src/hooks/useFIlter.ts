import React, { useMemo, useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import axios, { AxiosError } from "axios";
import { ROUTES } from "../util/Routes";
import toast from "react-hot-toast";

const useFilter = () => {
  const { allCourses, getAllCourse, setAllCourses } = useCourseContext();
  const [defualtValue, setDefaultValue] = useState("");
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
      setDefaultValue(value);
      toast.success("Filter was successfully");
    } catch (error) {
      if (error && error instanceof AxiosError) toast.error(error.toString());
      setFilter(false);
    }
  };
  const handleResetAuthorFilter = async () => {
    try {
      await getAllCourse();
      toast.success("Reset was successfully");
      setDefaultValue("");
    } catch (error) {
      if (error && error instanceof AxiosError) toast.error(error.toString());
      console.error(error);
    } finally {
      setFilter(false);
    }
  };
  return {
    filter,
    allAuthors,
    handleSelect,
    defualtValue,
    handleResetAuthorFilter,
  };
};
export default useFilter;
