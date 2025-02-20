import { IoStatsChart } from "react-icons/io5";
import TaskCard from "./TaskCard";
import { RiListCheck3 } from "react-icons/ri";
import { MdOutlinePending, MdTaskAlt } from "react-icons/md";

const WorkFlow = () => {
  return (
    <div>
      <h1 className="mt-8 mb-4 text-textLight dark:text-textDark font-semibold text-3xl flex items-center justify-center gap-2">
        <span>Workflow Overview</span>
        <IoStatsChart />
      </h1>

      {/* card header start */}
      <div className="grid grid-cols-3 gap-6">
        <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
          <RiListCheck3 />
          <span>To-do</span>
        </h3>
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
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
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
