import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";

const TaskCard = () => {
  return (
    <div className="space-y-3 shadow p-4 rounded-lg">
      <h3 className="text-xl font-semibold">
        Assertively incentivize e-business supply chains.
        <span className="text-textLight dark:text-textDark text-sm bg-accentColor rounded-lg top-0 ms-2 px-1">
          Pending
        </span>
      </h3>

      <p className="text-textLight dark:text-textDark text-md">
        Collaboratively negotiate synergistic mindshare before seamless
        deliverables.
      </p>
      <div className="flex justify-between">
        <div>
          <p className="text-xs">Created at: 20-02-2025</p>
          <p className="text-xs">Ends in: 21-02-2025</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-textLight dark:text-textDark text-xl"> 
            <FiEdit3 />
          </span>
          <span className="text-accentColor text-2xl">
            <MdOutlineDeleteForever />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
