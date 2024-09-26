import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios/useAxios";
import Heading from "../../Shared/Heading/Heading";

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const axiosSecure = useAxios();
    useEffect(() =>{
        axiosSecure.get("/jobs")
        .then(res =>{
            setJobs(res.data)
        })
    },[])
    return (
        <div>
            <Heading>Find job page is landing soon...</Heading>
            <h2 className="my-8 text-rose-600 text-3xl text-center font-semibold font-sans"> Total Job: {jobs.length}</h2>
        </div>
    );
};

export default Jobs;