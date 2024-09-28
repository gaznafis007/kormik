/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from "react-router-dom";
const Job = () => {
    const {title, jobPoster, jobDescription, skill} = useLoaderData();
    return (
        <section className="mx-8 my-4">
            <h1 className="text-4xl font-semibold text-rose-500 capitalize">{title}</h1>
            <h3 className="text-lg font-semibold font-sans text-white">{jobPoster}</h3>
            <h3 className="text-rose-500 font-semibold mt-8 mb-2">Description</h3>
            <p className="my-4 text-white">{jobDescription}</p>
            <h3 className="text-rose-500 font-semibold mt-8 mb-2 capitalize">required skills</h3>
            <ul className="my-4 text-white capitalize list-disc mx-4">
                {
                    skill.map((oneSkill, idx) => (
                        <li key={idx}>{oneSkill}</li>
                    ))
                }
            </ul>
        </section>
    );
};

export default Job;