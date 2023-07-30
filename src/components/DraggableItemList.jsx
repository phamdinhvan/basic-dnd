/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import DraggableItem from "./DraggableItem";

const DraggableList = (props) => {
  const [tempList, setTempList] = useState([]);

  useEffect(() => {
    setTempList(props.list);
  }, [props.list]);

  const handleOnDrop = (dragId, stillId) => {
    props.onChangeOrdering(dragId,stillId)
  };

  return (
    <>
      {tempList.map((item, idx) => {
        const renderItem = (
          <DraggableItem active={props.active} visible={props.visible} idx={idx} type={idx.toString()} handleOnDrop={handleOnDrop} children={item} />
        );
        return (
          <React.Fragment key={idx}>
            {props.renderChild(renderItem) ?? renderItem}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DraggableList;
