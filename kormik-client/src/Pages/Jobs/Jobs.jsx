import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Heading from "../../Shared/Heading/Heading";
import Card from "../../Shared/Card/Card";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import JobSearch from "../Job/JobSearch/JobSearch";
import useAxiosForData from "../../hooks/useAxiosForData/useAxiosForData";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import Loading from "../../Shared/Loading/Loading";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories] = useAxiosForData("/categories");
  const [isLoading, setIsLoading] = useState(true);
  const [subCategories, setSubCategories] = useState(null);
  const axiosSecure = useAxios();
  const handleSubCategories = (event) => {
    event.preventDefault();
    const category = event.target.value;
    axiosSecure.get(`/subCategories/${category}`).then((res) => {
      setSubCategories(res.data);
    });
  };
  const handleTitleSearch = (event) => {
    event.preventDefault();
    const title = event.target.value;
    if (title.length > 2) {
      axiosSecure.get(`/jobs?title=${title}`).then((res) => {
        console.log(res.data);
        setJobs(res.data);
      });
    }
  };
  const handleJobTypeSearch = (event) => {
    event.preventDefault();
    const jobType = event.target.value;
    axiosSecure
      .get(`/jobs?jobType=${jobType}`)
      .then((res) => setJobs(res.data));
  };
  const handleSearch = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const category = encodeURIComponent(form.category.value);
    const subCategory = encodeURIComponent(form.subCategory.value);
    const jobType = form.jobType.value;
    axiosSecure
      .get(
        `/jobs?title=${title}&category=${category}&subCategory=${subCategory}&jobType=${jobType}`
      )
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    axiosSecure.get("/jobs").then((res) => {
      const newJobs = res.data.filter((job) => job?.status !== "complete");
      setJobs(newJobs);
    });
    if (jobs && categories) {
      setIsLoading(false);
    }
  }, []);
  if(isLoading){
    <Loading type="spinner" size="md" text="Loading projects..." />
  }
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Heading>Search Your Dream Project</Heading>
        <JobSearch
          categories={categories}
          isLoading={isLoading}
          subCategories={subCategories}
          handleSubCategories={handleSubCategories}
          handleSearch={handleSearch}
          handleTitleSearch={handleTitleSearch}
          handleJobTypeSearch={handleJobTypeSearch}
        />
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-8 text-rose-400 text-3xl text-center font-bold"
        >
          Available Jobs: {jobs.length}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6"
        >
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card title={job?.title}>
                <p className="text-rose-400 font-semibold mb-2">
                  Rate: ${job?.projectRate}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job?.keyword.map((oneKeyword, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-700 px-3 py-1 text-sm rounded-full text-slate-200"
                    >
                      {oneKeyword}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-flex items-center text-rose-400 hover:text-rose-300 transition-colors duration-200"
                >
                  View Details
                  <ArrowLongRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
