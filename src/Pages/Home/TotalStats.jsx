import { FaTasks } from "react-icons/fa";
import { MdOutlinePending, MdTaskAlt } from "react-icons/md";
import { RiListCheck3 } from "react-icons/ri";

const TotalStats = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex items-center gap-2 bg-bgLight dark:bg-bgDark p-4 rounded-lg">
        <span>
          <FaTasks size={30} />
        </span>
        <p className="text-2xl">Total 120</p>
      </div>
      <div className="flex items-center gap-2 bg-bgLight dark:bg-bgDark p-4 rounded-lg">
        <span>
          <RiListCheck3 size={30} />
        </span>
        <p className="text-2xl">To-do 120</p>
      </div>
      <div className="flex items-center gap-2 bg-bgLight dark:bg-bgDark p-4 rounded-lg">
        <span>
          <MdOutlinePending size={30} />
        </span>
        <p className="text-2xl">In-progress 120</p>
      </div>
      <div className="flex items-center gap-2 bg-bgLight dark:bg-bgDark p-4 rounded-lg">
        <span>
          <MdTaskAlt size={30} />
        </span>
        <p className="text-2xl">Done 120</p>
      </div>
    </div>
  );
};

export default TotalStats;
