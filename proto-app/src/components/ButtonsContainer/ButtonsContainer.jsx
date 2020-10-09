import React from "react";

function ButtonsContainer({ context, children, touchFull} = {}) {
    return (
        <div className={`buttons-container${context ? ` ${context}-buttons` : ''}${touchFull ? ` touch-full` : ''}`}>
            {children}
        </div>
    )
}

export default ButtonsContainer;
