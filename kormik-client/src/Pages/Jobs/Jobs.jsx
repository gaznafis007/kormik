import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios/useAxios";
import Heading from "../../Shared/Heading/Heading";
import Card from "../../Shared/Card/Card";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const axiosSecure = useAxios();
  useEffect(() => {
    axiosSecure.get("/jobs").then((res) => {
      setJobs(res.data);
    });
  }, []);
  return (
    <div>
      <Heading>Find job page is landing soon...</Heading>
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
              {job?.skill.map((skill, idx) => (
                <p
                  key={idx}
                  className="bg-slate-700 px-2 py-1 text-sm rounded-full text-center"
                >
                  {skill}
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
