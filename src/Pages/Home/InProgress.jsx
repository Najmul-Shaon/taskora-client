/* eslint-disable react/prop-types */
import { MdOutlinePending } from "react-icons/md";
import TaskCard from "./TaskCard";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const InProgress = ({ setIsViewAddTask }) => {
  const { user } = useAuth();
  const [localInprogress, setLocalInprogress] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
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
  // inProgressRefetch();
  useEffect(() => {
    if (inProgress.length > 0) {
      setLocalInprogress(inProgress);
    }
  }, [inProgress]);

  // Sensors for desktop & mobile
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const onDragStart = (event) => {
    const task = localInprogress.find((todo) => todo.order === event.active.id);
    setActiveTask(task);
  };

  const onDragOver = (event) => {
    console.log(event);
    const { active, over } = event;
    // setActiveTask(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localInprogress.findIndex(
      (todo) => todo.order === active.id
    );
    const newIndex = localInprogress.findIndex(
      (todo) => todo.order === over.id
    );

    if (oldIndex !== newIndex) {
      setLocalInprogress((prev) => arrayMove(prev, oldIndex, newIndex));
    }

    // const updatedTodos = arrayMove(localToDos, oldIndex, newIndex);

    // console.log(localToDos);
    // console.log(updatedTodos);
    // setLocalToDos(updatedTodos);
  };

  const onDragEnd = () => {
    setActiveTask(null);
  };

  return (
    <div>
      <h3 className="text-textLight dark:text-textDark text-2xl my-3 flex items-center gap-2">
        <MdOutlinePending />
        <span>In-progress</span>
      </h3>
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={localInprogress}
            strategy={verticalListSortingStrategy}
          >
            {localInprogress.map((singleInProgress) => (
              <TaskCard
                key={singleInProgress._id}
                taskInfo={singleInProgress}
                setIsViewAddTask={setIsViewAddTask}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeTask ? (
              <TaskCard
                taskInfo={activeTask}
                setIsViewAddTask={setIsViewAddTask}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default InProgress;
