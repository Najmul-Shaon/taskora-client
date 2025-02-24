/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({
  id,
  title,
  tasks,
  setIsViewAddTask,
  allTasksRefetch,
  taskType,
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="p-4 border rounded bg-gray-100 min-h-screen"
    >
      <h2 className="text-lg font-bold mb-3">{title.toUpperCase()}</h2>
      <div className="space-y-3 min-h-[150px]" style={{ touchAction: "none" }}>
        {tasks.map((task) => (
          <TaskCard
            taskType={taskType}
            allTasksRefetch={allTasksRefetch}
            key={task._id}
            task={task}
            setIsViewAddTask={setIsViewAddTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
