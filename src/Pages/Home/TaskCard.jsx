/* eslint-disable react/prop-types */
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const TaskCard = ({ taskInfo, setIsViewAddTask }) => {
  const date = new Date(taskInfo?.createdAt);
  const formatedDate = date.toLocaleDateString("en-CA");

  // delete task::: permanent delete
  const handleDeleteTask = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="space-y-3 shadow p-4 rounded-lg">
      <h3 className="text-xl font-semibold">
        {taskInfo?.title}
        <span className="text-textLight dark:text-textDark text-sm bg-accentColor rounded-lg top-0 ms-2 px-1">
          {taskInfo?.category}
        </span>
      </h3>

      <p className="text-textLight dark:text-textDark text-md">
        {taskInfo?.description}
      </p>
      <div className="flex justify-between">
        <div>
          <p className="text-xs">Created at: {formatedDate}</p>
          <p className="text-xs">Ends in: {taskInfo?.deadline}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span
            onClick={() => setIsViewAddTask(true)}
            className="text-textLight dark:text-textDark text-xl cursor-pointer"
          >
            <FiEdit3 />
          </span>
          <span
            onClick={handleDeleteTask}
            className="text-accentColor text-2xl cursor-pointer"
          >
            <MdOutlineDeleteForever />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
