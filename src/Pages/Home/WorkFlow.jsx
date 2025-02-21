import { IoStatsChart } from "react-icons/io5";
import { useState } from "react";
import TaskAddForm from "./TaskAddForm";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";

const WorkFlow = () => {
  const [isViewAddTask, setIsViewAddTask] = useState(false);

  return (
    <div className="relative">
      <h1 className="mt-8 mb-4 text-textLight dark:text-textDark font-semibold text-3xl flex items-center justify-center gap-2">
        <span>Workflow Overview</span>
        <IoStatsChart />
      </h1>
      {/* toggle task add form  */}
      {isViewAddTask && <TaskAddForm setIsViewAddTask={setIsViewAddTask} />}
      {/* {isViewAddTask && (
        <>
          <div
            onClick={() => setIsViewAddTask(false)}
            className="fixed inset-0 z-70 bg-black opacity-50"
          ></div>
        </>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-10">
        {/* to do  */}
        <Todo setIsViewAddTask={setIsViewAddTask} />
        <InProgress setIsViewAddTask={setIsViewAddTask} />
        <Done setIsViewAddTask={setIsViewAddTask} />
      </div>
    </div>
  );
};

export default WorkFlow;
