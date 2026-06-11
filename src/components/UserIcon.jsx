import React from "react";

const UserIcon = ({ className = "", title = "User" }) => (
  <div
    className={`cursor-pointer flex items-center justify-center w-10 h-10 bg-[#38BDF8] rounded-full shadow-lg hover:bg-[#0ea5e9] transition ${className}`}
    title={title}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.25a7.5 7.5 0 0115 0v.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.25z"
      />
    </svg>
  </div>
);

export default UserIcon;
