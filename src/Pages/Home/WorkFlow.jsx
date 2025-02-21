import { IoStatsChart } from "react-icons/io5";
import TaskCard from "./TaskCard";
import { RiListCheck3 } from "react-icons/ri";
import { MdOutlinePending, MdTaskAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import TaskAddForm from "./TaskAddForm";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const WorkFlow = () => {
  const { user } = useAuth();
  const [isViewAddTask, setIsViewAddTask] = useState(false);
  const axiosSecure = useAxiosSecure();

  // axiosSecure.get(`/get/tasks?email=${user?.email}`).then((res) => {
  //   console.log(res.data);
  // });

  const { data: toDos = [], refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get/tasks?email=${user?.email}&category=to-do`
      );
      return res.data;
    },
  });
  refetch();

  console.log(toDos);
  return (
    <div className="relative">
      <h1 className="mt-8 mb-4 text-textLight dark:text-textDark font-semibold text-3xl flex items-center justify-center gap-2">
        <span>Workflow Overview</span>
        <IoStatsChart />
      </h1>
      {/* toggle task add form  */}
      {isViewAddTask && <TaskAddForm setIsViewAddTask={setIsViewAddTask} />}
      {isViewAddTask && (
        <>
          <div
            onClick={() => setIsViewAddTask(false)}
            className="fixed inset-0 z-60 bg-black opacity-50"
          ></div>
        </>
      )}

      {/* card header start */}
      <div className="grid grid-cols-3 gap-6">
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

        <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
          <MdOutlinePending />
          <span>In-progress</span>
        </h3>
        <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
          <MdTaskAlt />
          <span>Done</span>
        </h3>
      </div>
      {/* card header end  */}

      <div className="grid grid-cols-3 gap-6">
        {/* to do  */}
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

        {/* In-progress  */}
        <div className="space-y-4">
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>

        {/* done  */}
        <div className="space-y-4">
          <TaskCard />
          <TaskCard />
        </div>
      </div>
    </div>
  );
};

export default WorkFlow;
