import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const [isExpandedMenu, setIsExpandedMenu] = useState(false);
  const [isExpandedUser, setIsExpandedUser] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Successfully logged out.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong. Please try again.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  return (
    <div className="p-4 fixed">
      {/* user area  */}
      <div className="flex items-center gap-1">
        <div className="avatar avatar-online">
          <div className="w-6 rounded-full">
            <img src={user?.photoURL} />
          </div>
        </div>
        <h3
          onClick={() => setIsExpandedUser(!isExpandedUser)}
          className="flex items-center gap-2 cursor-pointer text-textLight dark:text-textDark p-2 transition"
        >
          <span>{user?.displayName}</span>
          {isExpandedUser ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h3>
      </div>

      {/* Sub-items of user area */}
      {isExpandedUser && (
        <div className="mt-2 space-y-1 pl-4 text-gray-700 dark:text-gray-300 absolute bg-white p-4 rounded-lg shadow">
          <p
            onClick={handleLogOut}
            className="text-textLight dark:hover:text-textDark cursor-pointer flex items-center gap-1"
          >
            <IoMdLogOut /> <span>Logout</span>
          </p>
        </div>
      )}

      <div className=""></div>
      <div className="divider"></div>
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
          {/* <p className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
            Add Task
          </p> */}
        </div>
      )}
    </div>
  );
};

export default NavBar;
