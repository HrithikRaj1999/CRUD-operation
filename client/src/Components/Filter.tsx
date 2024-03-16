import useFilter from "../hooks/useFIlter";

const Filter = () => {
  const { filter, allAuthors, handleResetAuthorFilter, handleSelect } =
    useFilter();
  return (
    <div className="flex h-screen  items-start my-4 mx-1 flex-col gap-4   p-3">
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