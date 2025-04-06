import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPastes = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center text-gray-500">
        Paste not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="mb-6">
        <input
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-2xl font-semibold text-gray-800 bg-gray-100 cursor-not-allowed"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <textarea
          className="w-full min-h-[300px] rounded-2xl p-4 text-lg border border-gray-300 bg-gray-100 text-gray-700 resize-none cursor-not-allowed"
          value={paste.content}
          disabled
        />
      </div>

      <div className="mt-4 text-right text-sm text-gray-400">
        Created at: {new Date(paste.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default ViewPastes;
