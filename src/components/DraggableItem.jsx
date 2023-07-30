import { useState } from "react";

export const DraggableItem = (props) => {
  const [draggable, setDraggable] = useState(false);

  /**
   * drag event, send id when begin dragging
   * @param event
   * @param info
   */
  const handleOnDragStart = (event, info) => {
    event.persist();
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/plain", JSON.stringify(info));
  };

  /**
   * drag event, meet another element
   * check if same container
   * @param event
   */
  const handleOnDragOver = (event, type) => {
    event.preventDefault();
    if (event.currentTarget?.classList.contains(type)) {
      event.currentTarget.style.backgroundColor = "#F0F3F8";
      event.currentTarget.style.transition = "background-color 300ms linear";
    }
  };

  /**
   * drag event, leave out of element, remove inline style to return css color
   * @param event
   */
  const handleOnDragLeave = (event) => {
    event.preventDefault();
    if (event.currentTarget?.style.backgroundColor !== "") {
      event.currentTarget.style.removeProperty("background-color");
    }
  };

  /**
   * drop event, get drag element, check if same container, swap position
   * @param event
   */
  const handleOnDrop = (event) => {
    event.preventDefault();
    event.persist();
    const transText = event.dataTransfer.getData("text");
    const dragId = parseInt(JSON.parse(transText).idx);
    const dragType = JSON.parse(transText).type;

    let stillId;
    if (event.currentTarget?.style.backgroundColor !== "") {
      event.currentTarget.style.removeProperty("background-color");
    }
    // if (event.currentTarget?.classList.contains(type) && dragType === type) {
    //   stillId = parseInt(event.currentTarget.getAttribute("data-id") ?? "");
    // }
    stillId = parseInt(event.currentTarget.getAttribute("data-id") ?? "");
    if (stillId !== undefined && dragId !== stillId)
      props.handleOnDrop(dragId, stillId);
  };

  return (
    <>
      <div
        data-id={props.idx}
        draggable={draggable}
        className={`relative pl-6 cursor-pointer h-12 flex items-center text-base text-[rgba(0, 0, 0, 0.5)] ${
          props.type
        } ${
          props.active === props.idx
            ? "font-bold text-[#098B9A] bg-[#EFFDFF]"
            : ""
        }`}
        onDragStart={(e) =>
          handleOnDragStart(e, { idx: props.idx, type: props.type })
        }
        onDragOver={(e) => handleOnDragOver(e, props.type)}
        onDragLeave={(e) => handleOnDragLeave(e)}
        onDrop={(e) => handleOnDrop(e, props.type)}
      >
        {props.visible && (
          <div
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)}
            className="custom-draggable-item__icon"
          >
            DRAG
          </div>
        )}
        {props.children}
      </div>
    </>
  );
};

export default DraggableItem;
