/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
