/* eslint-disable react/prop-types */
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  //   const style = transform
  //     ? {
  //         transform: `translate3d(${transform.x}px), ${transform.y}px,0`,
  //       }
  //     : undefined;

  const style = { transform: CSS.Translate.toString(transform) };
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};

export default Draggable;
