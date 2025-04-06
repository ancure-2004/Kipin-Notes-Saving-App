import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [justUpdated, setJustUpdated] = useState(false);

  useEffect(() => {
    if (justUpdated || !pasteId) return;
  
    const paste = allPastes.find((p) => p._id === pasteId);
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allPastes, justUpdated]);
  
  function createPaste() {
    const paste = {
      title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };
  
    if (pasteId) {
      dispatch(updateToPastes(paste));
      setJustUpdated(true); // Block re-filling
      setTitle("");
      setValue("");
      setSearchParams({});
      // Clear the flag after URL is cleared
      setTimeout(() => setJustUpdated(false), 100);
    } else {
      dispatch(addToPastes(paste));
      setTitle("");
      setValue("");
    }
  }
  

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex items-center justify-between gap-4 mb-6">
        <input
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="px-6 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div>
        <textarea
          className="w-full min-h-[300px] rounded-2xl p-4 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={value}
          placeholder="Write your note or code here..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
