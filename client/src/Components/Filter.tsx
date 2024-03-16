import React, { useMemo, useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import axios from "axios";

const Filter = () => {
  const { allCourses, getAllCourse, setAllCourses } = useCourseContext();

  const [filter, setFilter] = useState(false);

  const allAuthors = useMemo(
    () => allCourses.map((course) => course.author),
    [allCourses]
  );

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    try {
      const { data: courses } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/course/filter-by-authors?author=${value}`
      );
      setAllCourses([...courses]);
      setFilter(true);
    } catch (error) {
      console.error(error);
      setFilter(false);
    }
  };
  const handleResetAuthorFilter = async () => {
    try {
      await getAllCourse();
    } catch (error) {
      console.log(error);
    } finally {
      setFilter(false);
    }
  };
  return (
    <div className="flex h-screen  items-start my-4 mx-1 flex-col gap-4  bg-gray-300 p-3">
      <h1 className="text-3xl">Filter by author</h1>
      <select
        disabled={filter}
        onChange={handleSelect}
        defaultValue=""
        className="border-2 rounded-md p-3 text-left text-xl bg-gray-200"
      >
        <option value="" disabled>
          Filter Courses by author
        </option>
        {allAuthors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
      {filter ? (
        <button
          onClick={handleResetAuthorFilter}
          className="rounded-sm bg-blue-600 p-2 text-white"
        >
          Reset Filer
        </button>
      ) : null}
    </div>
  );
};

export default Filter;
