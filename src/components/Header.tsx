import React from "react";
import bicycle from "../assets/images/bicycle.png";
import { A, navigate } from "hookrouter";
import { USER_DETAILS } from "../constants/constants";
function Header() {
  const user = localStorage.getItem(USER_DETAILS);

  const logout = () => {
    localStorage.removeItem(USER_DETAILS);
    navigate("/login");
  };

  return (
    <nav className="flex w-9/12 mb-5 items-center justify-between flex-wrap bg-gray-700 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={bicycle} alt="bicycle" className="mx-auto h-12 w-12 mr-2" />
        <span className="font-bold text-xl">Cycling</span>
      </div>

      <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="text-sm sm:flex-grow">
          <A
            href="/"
            className="block mt-4 sm:inline-block text-base sm:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Dashboard
          </A>
          <A
            href="/history"
            className="block mt-4 sm:inline-block text-base sm:mt-0 text-teal-200 hover:text-white mr-4"
          >
            History
          </A>
        </div>
        {user ? (
          <div>
            <span className="mr-3">Hello,&nbsp; {user}</span>
            <button
              onClick={logout}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <A
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 md:mt-0"
            >
              Login
            </A>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
