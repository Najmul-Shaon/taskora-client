/* eslint-disable react/prop-types */
import { MdTaskAlt } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";

const Done = ({ setIsViewAddTask }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: done = [], refetch: inDoneRefetch } = useQuery({
    queryKey: ["done"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/tasks?email=${user?.email}&category=done`
      );
      return res.data;
    },
  });

  inDoneRefetch();
  return (
    <div>
      <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
        <MdTaskAlt />
        <span>Done</span>
      </h3>
      <div className="space-y-4">
        {done.map((singleDone) => (
          <TaskCard
            key={singleDone._id}
            taskInfo={singleDone}
            setIsViewAddTask={setIsViewAddTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Done;
