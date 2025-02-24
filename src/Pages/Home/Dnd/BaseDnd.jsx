/* eslint-disable react/prop-types */
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import Column from "./Column";

const BaseDnd = ({
  setIsViewAddTask, allTasksRefetch,
  tasks,
  updateTaskCategory,
  categories = ["to-do", "in-progress", "done"],
}) => {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [taskType, setTaskType] = useState(null);
  useEffect(() => {
    if (tasks.length > 0) {
      setLocalTasks(tasks);
    }
  }, [tasks]);

  // Set up sensors for different devices
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor);

  //   console.log(localTasks);
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
setTaskType(over.id);
    // console.log("Dragging Task ID:", active.id);
    // console.log("Dropped Over ID:", over.id);

    const validCategories = categories;
    if (!validCategories.includes(over.id)) {
      console.warn("Invalid drop location:", over.id);
      return;
    }

    // Optimistically update task category
    const updatedTasks = localTasks.map((task) =>
      task._id === active.id ? { ...task, category: over.id } : task
    );
    setLocalTasks(updatedTasks); // Update local state to reflect changes

    // Call API to update the task category
    updateTaskCategory(active.id, over.id);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {categories.map((category) => (
          <Column
            setIsViewAddTask={setIsViewAddTask}
            allTasksRefetch={allTasksRefetch}
            taskType={taskType}
            key={category}
            id={category}
            title={category}
            tasks={localTasks.filter((task) => task.category === category)} // Filter based on updated tasks
          />
        ))}
      </div>
    </DndContext>
  );
};

export default BaseDnd;
