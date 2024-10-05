import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios/useAxios";
import Heading from "../../../../Shared/Heading/Heading";
import Card from "../../../../Shared/Card/Card";
import Button from "../../../../Shared/Button/Button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const Bids = ({ jobId }) => {
  const axiosSecure = useAxios();
  const [bids, setBids] = useState([]);
  const [seeDetails, setSeeDetails] = useState("");
  const handleSeeDetails = (id) => {
    setSeeDetails(id);
  };
  const handleDelete = (id) => {
    console.log(id);
    axiosSecure.delete(`/bids/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Bid deleted successfully!",
          icon: "error",
        });
        const newBids = bids.filter((bid) => bid._id !== id);
        setBids(newBids);
      }
    });
  };
  const handleBidWinner = (ids) => {
    console.log(ids[0]);
    console.log(ids[1]);
    console.log(ids);
    const bidId = { bidId: ids[0] };
    const winner = { status: "winner" };
    const winningBid = ids[2];
    winningBid.bidId = ids[0]
    axiosSecure.put(`/bids/${ids[0]}`, winner).then((res) => {
      if (res.data.modifiedCount > 0) {
        axiosSecure.put(`/jobs/${ids[1]}`, bidId).then((res) => {
          if (res.data.modifiedCount > 0) {
            axiosSecure.post("/winners", { winningBid }).then((res) => {
              if (res.data.acknowledged) {
                Swal.fire({
                  title: "congrats!, you chose your talent",
                  icon: "success",
                });
              }
            });
          }
        });
      }
    });
  };
  useEffect(() => {
    axiosSecure.get(`/bids?jobId=${jobId}`).then((res) => setBids(res.data));
  }, []);
  return (
    <div className="p-6 overflow-y-auto border-2 rounded-md border-slate-900 shadow-md shadow-slate-300">
      <Heading>All the pitches</Heading>
      <div className="flex flex-col gap-4">
        {bids.length ? (
          bids.map((bid) => (
            <Card key={bid._id} title={bid?.bidTitle}>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-md font-sans font-semibold">
                  @{bid?.bidder}
                </h1>
                {seeDetails === bid._id ? (
                  <ChevronUpIcon
                    onClick={() => handleSeeDetails("")}
                    className="size-6 text-white"
                  ></ChevronUpIcon>
                ) : (
                  <ChevronDownIcon
                    onClick={() => handleSeeDetails(bid._id)}
                    className="size-6 text-white"
                  ></ChevronDownIcon>
                )}
              </div>
              {seeDetails === bid._id && (
                <>
                  <h2 className="text-rose-500 my-4 capitalize">
                    cover letter
                  </h2>
                  <p className="text-sm w-full font-sans">{bid?.coverLetter}</p>
                  <h2 className="my-4 text-rose-500 capitalize">
                    Asking price:{" "}
                    <span className="text-white font-semibold">
                      {bid?.bidPrice}$
                    </span>
                  </h2>
                  <h2 className="text-rose-500 my-4">Milestones</h2>
                  <ul className="list-disc ml-4 capitalize">
                    {bid?.milestones?.map((milestone) => (
                      <li className="font-semibold" key={milestone}>
                        {milestone}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col md:flex-row">
                    <Button
                      handler={handleBidWinner}
                      params={[bid?._id, bid?.jobId, bid]}
                    >
                      Choose this bid for your project
                    </Button>
                    <Button handler={handleDelete} params={bid?._id}>
                      <TrashIcon className="size-6"></TrashIcon>
                    </Button>
                  </div>
                </>
              )}
            </Card>
          ))
        ) : (
          <Heading>no bid submitted yet</Heading>
        )}
      </div>
    </div>
  );
};

export default Bids;
