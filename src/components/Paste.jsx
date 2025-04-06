import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ClipboardCopy, Share2, Trash, Pencil, Eye } from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <input
        className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-8 pb-10">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {paste.title}
                </h2>
                <div className="flex gap-3">
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </Link>
                  <Link
                    to={`/pastes/${paste._id}`}
                    className="text-green-600 hover:text-green-800 transition"
                    title="View"
                  >
                    <Eye size={20} />
                  </Link>
                </div>
              </div>

              <p className="text-gray-700 whitespace-pre-wrap break-words mb-6">
                {paste.content.length > 200
                  ? paste.content.slice(0, 200) + "..."
                  : paste.content}
              </p>

              <div className="flex justify-between items-end">
                <div className="text-xs text-gray-400">
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
                <div className="flex gap-4 text-sm">
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="hover:text-red-500 transition"
                    title="Delete"
                  >
                    <Trash size={20} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="hover:text-blue-500 transition"
                    title="Copy"
                  >
                    <ClipboardCopy size={20} />
                  </button>
                  <button
                    className="hover:text-gray-500 transition"
                    title="Share"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
