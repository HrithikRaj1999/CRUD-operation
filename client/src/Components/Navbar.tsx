import { Link, useLocation, } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
  const { pathname } = useLocation();
  const showSearch = pathname.toString() === "/";
  const NavList = () => (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li color="blue-gray" className="p-1 font-normal">
        <Link to="/create-course" className="flex items-center">
          Create Course
        </Link>
      </li>
      <li color="blue-gray" className="p-1 font-normal">
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="sticky bg-black text-white top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <span className="mr-4 cursor-pointer py-1.5 font-medium">
          Stikkman UX Course Task
        </span>
        {showSearch ? <Search /> : null}
        <NavList />
      </div>
    </nav>
  );
}
