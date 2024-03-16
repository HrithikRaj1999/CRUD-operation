import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
  const { pathname } = useLocation();

  const showSearch = pathname === "/";

  const NavList = () => (
    <ul className="mt-2 mb-4 text-pretty font-semibold flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-normal">
        <Link
          to="/create-course"
          className={`flex items-center ${
            pathname === "/create-course" ? "underline" : ""
          }`}
        >
          Create Course
        </Link>
      </li>
      <li className="p-1 font-normal">
        <Link
          to="/"
          className={`flex items-center ${pathname === "/" ? "underline" : ""}`}
        >
          Home
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="sticky bg-black min-w-[400px] text-3xl text-white top-0 z-10 h-20 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <img
    
          src="/logo.png"
          className="w-[50px] h-[50px] object-fit rounded-full mx-2 bg-[#09948f] bg-opacity-90"
          alt="img"
        />
        <span className="mr-4 cursor-pointer py-1.5 font-medium">
          Stikkman UX Course Task
        </span>
        {showSearch ? <Search /> : null}
        <NavList />
      </div>
    </nav>
  );
}
