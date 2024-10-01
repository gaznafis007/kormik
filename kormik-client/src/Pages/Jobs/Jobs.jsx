import { Link } from "react-router-dom";
import Heading from "../../Shared/Heading/Heading";
import Card from "../../Shared/Card/Card";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import JobSearch from "../Job/JobSearch/JobSearch";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";

const Jobs = () => {
  const [jobs] = useAxiosForData("/jobs")
  const [categories] = useAxiosForData("/categories")
  const [isLoading, setIsLoading] = useState(true)
  const [subCategories, setSubCategories] = useState(null)
    const axiosSecure = useAxios()
    const handleSubCategories = (event) => {
        event.preventDefault();
        const category = event.target.value;
        // for test purpose
        // console.log(category);
        axiosSecure.get(`/subCategories/${category}`).then((res) => {
          setSubCategories(res.data);
        });
      };
  useEffect(() =>{
    if(categories && jobs){
      setIsLoading(false)
    }
  },[])
  // if(isLoading){
  //   return <h2 className="text-2xl text-center text-rose-500 font-sans font-semibold animate-ping">Loading...</h2>
  // }
  return (
    <div>
      <Heading>Search your desire project</Heading>
      <JobSearch categories={categories} isLoading={isLoading} subCategories={subCategories} handleSubCategories={handleSubCategories}></JobSearch>
      <h2 className="my-8 text-rose-600 text-3xl text-center font-semibold font-sans">
        {" "}
        Total Job: {jobs.length}
      </h2>
      <div className="grid mx-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {jobs.map((job) => (
          <Card key={job._id} title={job?.title}>
            Rate: {job?.projectRate}
            <br />
            <div className="flex flex-row gap-2 items-center my-4">
              {job?.keyword.map((oneKeyword, idx) => (
                <p
                  key={idx}
                  className="bg-slate-700 px-2 py-1 text-sm rounded-full text-center"
                >
                  {oneKeyword}
                </p>
              ))}
            </div>
            <Link
              to={`/jobs/${job._id}`}
              className="flex flex-row gap-3 justify-between items-center text-rose-500 my-4"
            >
              Checkout{" "}
              <ArrowLongRightIcon className="size-6 text-rose-500 hover:size-7"></ArrowLongRightIcon>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
