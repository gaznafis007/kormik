/* eslint-disable react/prop-types */
import { PaperClipIcon } from "@heroicons/react/24/outline";
import useAuth from "../../../hooks/useAuth/useAuth";

const Chat = ({ winner }) => {
  const { conversations, bidder, jobPoster } = winner;
    const {user} = useAuth()
  return (
    <div className="w-full">
      <div className="rounded-md  max-h-[500px] overflow-y-auto">
        {conversations && conversations.length > 0 ? (
          conversations.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-2 ${
                user?.role === message?.sender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-4 rounded-lg ${
                    user?.role === message?.sender
                    ? "bg-rose-500 text-white"
                    : "bg-gray-200 text-rose-500"
                }`}
              >
                <p className="font-semibold capitalize">
                  {message.sender === "employer" ? jobPoster : bidder}
                </p>
                <p>{message.description}</p>
                {message.fileUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <PaperClipIcon className="w-5 h-5" />
                    <a
                      href={message.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-300 underline"
                    >
                      View Attachment
                    </a>
                  </div>
                )}
                <p className="text-xs text-rose-300 mt-2 text-right">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No messages yet. Start a conversation!
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;
