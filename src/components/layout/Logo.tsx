import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="w-12 h-12 bg-pexels-green flex items-center justify-center rounded">
        <span className="text-white text-xl font-bold">P</span>
      </div>
      <h1 className="text-white text-2xl font-bold ml-2">Pexels</h1>
    </Link>
  );
};

export default Logo; 