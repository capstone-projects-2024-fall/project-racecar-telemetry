import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import EngineTempGauge from "@components/EngineTempGauge";


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
  const style = {
    backgroundColor: '#90EE90',
    border: '1px dashed #aaa',
    padding: '1rem',
    minWidth: '100px',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

// Main CustomDash component
export default function CustomDash() {
  const initialLayout = [
    { id: 'item1', position: 'zone-1' },
    { id: 'item2', position: 'zone-2' },
    { id: 'engineTempGauge', position: 'zone-3' } // Add EngineTempGauge here
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
  const zones = ['zone-1', 'zone-2', 'zone-3', 'zone-4'];

  return (
    <div className="droppable-grid" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '1rem' }}>
      {zones.map((zone) => (
        <DroppableZone key={zone} id={zone}>
          {layout
            .filter((item) => item.position === zone)
            .map((item) => (
              <DraggableComponent key={item.id} id={item.id}>
                {item.id === 'engineTempGauge' ? <EngineTempGauge /> : item.id}
              </DraggableComponent>
            ))}
        </DroppableZone>
      ))}
    </div>
  );
}
