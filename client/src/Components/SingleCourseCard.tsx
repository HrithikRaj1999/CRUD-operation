import { SingleCourseCardProps } from "../util/types";

const SingleCourseCard = (props: SingleCourseCardProps) => {
  const { thumbnail, name, author, description } = props.course;
  return (
    <div className="w-[400px] h-[400px] flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl  hover:shadow-2xl hover:bg-zinc-100" >
      <div className="h-60  mx-4  mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={thumbnail} alt="card" className="object-fit w-full h-full" />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {name}
        </h5>
        <h6>by {author}</h6>
        <p className="block my-3 font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SingleCourseCard;
