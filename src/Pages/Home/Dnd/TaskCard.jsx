/* eslint-disable react/prop-types */
import { useDraggable } from "@dnd-kit/core";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import TaskEditForm from "../TaskEditForm";

const TaskCard = ({ task, taskType, allTasksRefetch }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isViewEidtTask, setIsViewEidtTask] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const handleEdit = (id) => {
    setIsViewEidtTask(true);
    setEditingTaskId(id);
  };

  // delete task::: permanent delete
  const handleDeleteTask = (id) => {
    // console.log(id);
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
        axiosSecure
          .delete(`/delete/task/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Deleted!",
                text: "Your file has been deleted.",
                showConfirmButton: false,
                timer: 1000,
              });
              allTasksRefetch();
            }
          })
          .catch(() => {
            // console.log(error);
          });
      }
    });
  };

  // check task expired or not
  useEffect(() => {
    const currentDate = new Date();
    const dueDate = new Date(task.deadline);
    if (dueDate < currentDate) {
      console.log("exp", dueDate);
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  }, [task.deadline]);

  return (
    <div>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="p-4 bg-white shadow rounded cursor-grab"
      >
        <div>
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p
              className={`text-xs  ${
                isExpired ? "text-accentColor" : "text-gray-500"
              }`}
            >
              Due: {task.deadline}
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => handleEdit(task?._id)}>
              <FiEdit3 />
            </button>
            <button
              onClick={() => handleDeleteTask(task?._id)}
              className="text-accentColor text-2xl cursor-pointer"
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* toggle task add form  */}
        {isViewEidtTask && (
          <TaskEditForm
            setIsViewEidtTask={setIsViewEidtTask}
            editingTaskId={editingTaskId}
            allTasksRefetch={allTasksRefetch}
            taskType={taskType}
          />
        )}
      </div>
    </div>
  );
};

export default TaskCard;
