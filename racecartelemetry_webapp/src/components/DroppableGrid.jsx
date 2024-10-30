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
                  {item.component}
                </DraggableComponent>
              ))}
          </DroppableZone>
        ))}
      </div>
    );
  }
  