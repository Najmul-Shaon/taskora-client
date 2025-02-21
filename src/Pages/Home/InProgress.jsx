/* eslint-disable react/prop-types */
import { MdOutlinePending } from "react-icons/md";
import TaskCard from "./TaskCard";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const InProgress = ({ setIsViewAddTask }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  const { data: inProgress = [], refetch: inProgressRefetch } = useQuery({
    queryKey: ["inProgress"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/tasks?email=${user?.email}&category=in-progress`
      );
      return res.data;
    },
  });
  inProgressRefetch();
  return (
    <div>
      <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
        <MdOutlinePending />
        <span>In-progress</span>
      </h3>
      <div className="space-y-4">
        {inProgress.map((singleInProgress) => (
          <TaskCard
            key={singleInProgress._id}
            taskInfo={singleInProgress}
            setIsViewAddTask={setIsViewAddTask}
          />
        ))}
      </div>
    </div>
  );
};

export default InProgress;
