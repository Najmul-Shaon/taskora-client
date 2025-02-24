// import TotalStats from "./TotalStats";
import { useState } from "react";
import Dashboard from "./Dnd/Dashboard";
import { IoStatsChart } from "react-icons/io5";
import TaskAddForm from "./TaskAddForm";
import { FaPlus } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from "react-icons/io";

const Home = () => {
  const [isViewAddTask, setIsViewAddTask] = useState(false);
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
            setIsExpandedUser(false);
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
    <div className="mt-4 max-w-screen-2xl mx-auto px-4">
      <div>
        <h1 className="mt-8 mb-4 text-textLight dark:text-textDark font-semibold text-3xl flex items-center justify-center gap-2">
          <span>Workflow Overview</span>
          <IoStatsChart />
        </h1>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsViewAddTask(true)}
          className="flex items-center gap-1 text-lg btn btn-sm btn-outline  p-1 rounded-lg  cursor-pointer"
        >
          <FaPlus />
          Add Task
        </button>

        {/* user area  */}
        <div>
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
        </div>
      </div>

      <div>
        {/* toggle task add form  */}
        {isViewAddTask && <TaskAddForm setIsViewAddTask={setIsViewAddTask} />}
      </div>

      <Dashboard setIsViewAddTask={setIsViewAddTask} />
    </div>
  );
};

export default Home;
