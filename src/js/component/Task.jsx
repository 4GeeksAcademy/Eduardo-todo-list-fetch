import React, { useState } from "react";

const Task = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="list-group-item d-flex justify-content-between align-items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p>{props.task.label}</p>
            {isHovered && (
                <button className="btn btn-sm btn-danger" onClick={props.onRemove}> X </button>
            )}
        </div>
    );
};

export default Task;