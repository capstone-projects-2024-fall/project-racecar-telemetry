import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// Reusable DraggableComponent
function DraggableComponent({ id, children }) {
  const { setNodeRef, listeners, transform } = useDraggable({ id });
  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
  };

  return (
    <div ref={setNodeRef} {...listeners} style={style} className="draggable">
      {children}
    </div>
  );
}

// Reusable DroppableZone
function DroppableZone({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="droppable-zone">
      {children}
    </div>
  );
}

// Main CustomDash component
export default function CustomDash() {
  const initialLayout = [
    { id: 'item1', position: 'zone-1' },
    { id: 'item2', position: 'zone-2' },
  ];
  const [layout, setLayout] = useState(initialLayout);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.id === active.id ? { ...item, position: over.id } : item
        )
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="custom-dash">
        <DroppableGrid layout={layout} />
      </div>
    </DndContext>
  );
}

function DroppableGrid({ layout }) {
  const zones = ['zone-1', 'zone-2', 'zone-3', 'zone-4']; // Define zones as needed

  return (
    <div className="droppable-grid">
      {zones.map((zone) => (
        <DroppableZone key={zone} id={zone}>
          {layout
            .filter((item) => item.position === zone)
            .map((item) => (
              <DraggableComponent key={item.id} id={item.id}>
                {item.id} {/* Placeholder for content */}
              </DraggableComponent>
            ))}
        </DroppableZone>
      ))}
    </div>
  );
}
