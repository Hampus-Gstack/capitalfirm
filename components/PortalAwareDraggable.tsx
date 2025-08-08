"use client";

import React from "react";
import ReactDOM from "react-dom";
import { Draggable, DraggableProps } from "react-beautiful-dnd";

// Renders the dragging clone into a portal attached to document.body to avoid
// CSS transform/filter/backdrop-filter issues on ancestors that can cause
// offset or jitter during dragging.
export default function PortalAwareDraggable(props: DraggableProps) {
  return (
    <Draggable {...props}>
      {(provided, snapshot) => {
        const child = props.children(provided, snapshot);

        if (snapshot.isDragging) {
          // During dragging, render into a portal so position: fixed is relative to viewport
          return ReactDOM.createPortal(child as React.ReactNode, document.body);
        }

        return child as React.ReactElement;
      }}
    </Draggable>
  );
}


