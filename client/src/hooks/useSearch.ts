import { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
const useSearch = () => {
  const { allCourses, setAllCourses, getAllCourse } = useCourseContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearch] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(true);
    const filteredCourses = allCourses?.filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCourses?.length) {
      setAllCourses([...filteredCourses]);
    }
  };

  const handleResetSearch = async () => {
    await getAllCourse();
    setSearchTerm("");
    setSearch(false);
  };
  return {
    handleResetSearch,
    searched,
    setSearchTerm,
    handleSearch,
    searchTerm,
  };
};

export default useSearch;
