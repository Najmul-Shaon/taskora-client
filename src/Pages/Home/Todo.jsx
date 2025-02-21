/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa6";
import { RiListCheck3 } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";

const Todo = ({ setIsViewAddTask }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: toDos = [], refetch: toDosRefetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/tasks?email=${user?.email}&category=to-do`
      );
      return res.data;
    },
  });
  toDosRefetch();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
          <RiListCheck3 />
          <span>To-do</span>
        </h3>
        <span
          onClick={() => setIsViewAddTask(true)}
          className="flex items-center gap-1 text-lg bg-accentColor p-1 rounded-lg text-white cursor-pointer"
        >
          <FaPlus />
          Add Task
        </span>
      </div>
      <div className="space-y-4">
        {/* {toDos?.length < 1 && <p className="text-accentColor">Empty</p>} */}
        {toDos.map((todo) => (
          <TaskCard
            key={todo._id}
            taskInfo={todo}
            setIsViewAddTask={setIsViewAddTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
