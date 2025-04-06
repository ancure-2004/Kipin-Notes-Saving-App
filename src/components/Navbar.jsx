import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, PlusCircle, MoonIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center rounded-xl mb-6">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
        <BookOpen size={28} />
        Kipin
      </Link>
      
      <div className="flex gap-6 items-center text-gray-600">
        <Link 
          to="/" 
          className="hover:text-indigo-600 transition font-medium"
        >
          Home
        </Link>
        <Link 
          to="/pastes" 
          className="hover:text-indigo-600 transition font-medium"
        >
          All Pastes
        </Link>
        <Link 
          to="/?new=true" 
          className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          <PlusCircle size={18} />
          New Paste
        </Link>
        <button
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
          aria-label="Dark mode toggle"
        >
          <MoonIcon size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
