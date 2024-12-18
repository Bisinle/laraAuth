import React from "react";

const Header = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="flex flex-col items-start">
          <span className="text-sm font-medium text-indigo-600 mb-1">
            Welcome back
          </span>
          <span className="text-3xl font-bold text-gray-900 leading-tight">
            {currentUser.name}
            <span className="inline-block animate-wave ml-2">👋</span>
          </span>
        </h1>{" "}
        <div className="flex items-center">
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <span className="mr-2">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
