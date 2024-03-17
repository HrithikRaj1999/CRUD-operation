import Spinner from "./Spinner";
import { useCourseContext } from "../context/CourseContext";
import { ButtonWithSpinnerProps } from "../util/types";

const ButtonWithSpinner = ({
  onClick,
  type = "button",
  className,
  spinnerClassName,
  w,
  h,
  children,
  ...rest
}: ButtonWithSpinnerProps) => {
  const { loading } = useCourseContext();

  return (
    <div className={"flex  disabled:bg-blue-200 min-w-20 justify-center items-center" + className}>
      <button
        className="flex flex-row  justify-center items-center gap-x-1 px-1  "
        {...{ onClick, ...rest }}
      >
        {loading ? <Spinner {...{ w, h, spinnerClassName }} /> : children}
      </button>
    </div>
  );
};

export default ButtonWithSpinner;
