import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios/useAxios";
import Heading from "../../../../Shared/Heading/Heading";
import Card from "../../../../Shared/Card/Card";

// eslint-disable-next-line react/prop-types
const Bids = ({ jobId }) => {
  const axiosSecure = useAxios();
  const [bids, setBids] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/bids?jobId=${jobId}`).then((res) => setBids(res.data));
  }, []);
  return (
    <div className="p-6 border-2 rounded-md border-rose-500 shadow-md shadow-rose-300">
      <Heading>All the pitches</Heading>
      {bids.map((bid) => (
        <Card key={bid._id} title={bid?.bidTitle}>
          <h1 className="text-md font-sans font-semibold">@{bid?.bidder}</h1>
          <h2 className="text-rose-500 my-4 capitalize">cover letter</h2>
          <p className="text-sm font-sans">{bid?.coverLetter}</p>
          <h2 className="my-4 text-rose-500 capitalize">
            Asking price:{" "}
            <span className="text-white font-semibold">{bid?.bidPrice}$</span>
          </h2>
          <h2 className="text-rose-500 my-4">Milestones</h2>
          <ul className="list-disc ml-4 capitalize">
            {
                bid?.milestones?.map(milestone =>(
                    <li className="font-semibold" key={milestone}>{milestone}</li>
                ))
            }
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default Bids;
