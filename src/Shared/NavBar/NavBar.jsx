import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from "react-icons/io";

const NavBar = () => {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false);
  const [isExpandedUser, setIsExpandedUser] = useState(false);
  return (
    <div className="p-4 fixed">
      {/* user area  */}
      <div className="flex items-center gap-1">
        <div className="avatar avatar-online">
          <div className="w-6 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <h3
          onClick={() => setIsExpandedUser(!isExpandedUser)}
          className="flex items-center gap-2 cursor-pointer text-textLight dark:text-textDark p-2 transition"
        >
          <span>Najmul Shaon</span>
          {isExpandedUser ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h3>
      </div>
      <div className="divider"></div>
      {/* Sub-items of user area */}
      {isExpandedUser && (
        <div className="mt-2 space-y-1 pl-4 text-gray-700 dark:text-gray-300 absolute bg-white p-4 rounded-lg shadow">
          <p className="text-textLight dark:hover:text-textDark cursor-pointer flex items-center gap-1">
            <IoMdLogOut /> <span>Logout</span>
          </p>
        </div>
      )}
      {/* Manage Task - Expandable */}
      <div
        onClick={() => setIsExpandedMenu(!isExpandedMenu)}
        className="flex items-center gap-2 cursor-pointer text-textLight dark:text-textDark p-2 transition"
      >
        <span>Manage Task</span>
        {isExpandedMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {/* Sub-items of menu */}
      {isExpandedMenu && (
        <div className="mt-2 space-y-1 pl-4 text-gray-700 dark:text-gray-300">
          <p className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
            Add Task
          </p>
          <p className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
            Edit Task
          </p>
          <p className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
            Delete Task
          </p>
        </div>
      )}
    </div>
  );
};

export default NavBar;
