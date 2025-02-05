import React, { useState } from "react";

const Task = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="d-flex justify-content-between border p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p>{props.task.label}</p>
      {isHovered && (
        <span onClick={props.onRemove} style={{ cursor: "pointer" }}>
          X
        </span>
      )}
    </div>
  );
};

export default Task;