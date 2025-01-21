const Navbar = () => {
  return (
    <div className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 lg:px-10 flex justify-between items-center h-16">
        {/* Left Section: Search */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-72"
          />
        </div>

        {/* Center Section: Menu Items */}
        <div className="flex space-x-8">
          {/* Home */}
          <div className="group relative flex flex-col items-center cursor-pointer">
            <div className="bg-gray-100 p-2.5 rounded-full group-hover:bg-blue-500 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 text-gray-600 group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.25L12 3.75l9 6.5V20.25H3V10.25z"
                />
              </svg>
            </div>
            <span className="absolute -bottom-6 text-xs text-gray-600 group-hover:text-blue-500 transition duration-300 opacity-0 group-hover:opacity-100">
              Home
            </span>
          </div>

          {/* Videos */}
          <div className="group relative flex flex-col items-center cursor-pointer">
            <div className="bg-gray-100 p-2.5 rounded-full group-hover:bg-blue-500 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 text-gray-600 group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.25 8.5l-5.5 3.25 5.5 3.25V8.5zM3.75 19.25h16.5V4.75H3.75v14.5z"
                />
              </svg>
            </div>
            <span className="absolute -bottom-6 text-xs text-gray-600 group-hover:text-blue-500 transition duration-300 opacity-0 group-hover:opacity-100">
              Videos
            </span>
          </div>

          {/* Add Friend */}
          <div className="group relative flex flex-col items-center cursor-pointer">
            <div className="bg-gray-100 p-2.5 rounded-full group-hover:bg-blue-500 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 text-gray-600 group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8.75h4.5M18.25 7v3.5M8 9.25a4 4 0 100 8 4 4 0 000-8zM4.25 16.5a5.97 5.97 0 017.5 0"
                />
              </svg>
            </div>
            <span className="absolute -bottom-10 text-xs text-gray-600 group-hover:text-blue-500 transition duration-300 opacity-0 group-hover:opacity-100">
              Add Friend
            </span>
          </div>

          {/* Profile */}
          <div className="group relative flex flex-col items-center cursor-pointer">
            <div className="bg-gray-100 p-2.5 rounded-full group-hover:bg-blue-500 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 text-gray-600 group-hover:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3.75a4 4 0 100 8 4 4 0 000-8zM8.25 19.25c.75-2.5 3.5-4.5 7.5-4.5s6.75 2 7.5 4.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-6 text-xs text-gray-600 group-hover:text-blue-500 transition duration-300 opacity-0 group-hover:opacity-100">
              Profile
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
