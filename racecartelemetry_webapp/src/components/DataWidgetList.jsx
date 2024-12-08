import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import DataWidget from "./DataWidget";
import telemetryConnectionStatus from "@hooks/telemetryConnectionStatus";
import { fetchCANData, getCurrentConfig } from "@services/CANConfigurationService";
import ConfigWidget from "@components/ConfigWidget";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableWidget = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const DataWidgetList = () => {
  const [currentConfig, setCurrentConfig] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [widgetOrder, setWidgetOrder] = useState([]);
  const isConnected = telemetryConnectionStatus(); // Check connection status

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const configName = await getCurrentConfig();
        setCurrentConfig(configName);

        if (!configName) {
          throw new Error("No current configuration found.");
        }

        const fetchedData = await fetchCANData(configName);
        setConfigData(fetchedData);

        // Set initial widget order based on fetched data
        const initialOrder = [];
        Object.entries(fetchedData).forEach(([canID, canData]) => {
          Object.keys(canData.DataChannels || {}).forEach((channelKey) => {
            initialOrder.push(`${canID}-${channelKey}`);
          });
        });

        initialOrder.push("elapsedTime"); // Add elapsed time as a widget
        setWidgetOrder(initialOrder);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchConfigData();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgetOrder((prevOrder) => {
        const oldIndex = prevOrder.indexOf(active.id);
        const newIndex = prevOrder.indexOf(over.id);
        return arrayMove(prevOrder, oldIndex, newIndex);
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!configData || Object.keys(configData).length === 0) {
    return <Typography color="white">No configuration data available</Typography>;
  }

  // Check if any CAN ID has DataChannels
  const hasDataChannels = Object.values(configData).some(
    (canData) => canData.DataChannels && Object.keys(canData.DataChannels).length > 0
  );

  if (!hasDataChannels) {
    return <Typography color="white">No DataChannels available in any configuration</Typography>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: "auto",
          padding: 2,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Fixed Configuration Widget */}
        <Box>
          <ConfigWidget title={"Selected Configuration"} />
        </Box>

        {/* Draggable Widgets */}
        <SortableContext items={widgetOrder} strategy={horizontalListSortingStrategy}>
          {widgetOrder.map((widgetId) => {
            if (widgetId === "elapsedTime") {
              return (
                <SortableWidget key={widgetId} id={widgetId}>
                  <DataWidget
                    canID="elapsedTime"
                    valueToDisplay="Elapsed Time"
                    title="Elapsed Time"
                    unit="s"
                    isElapsedTime={true}
                    isConnected={isConnected}
                  />
                </SortableWidget>
              );
            }

            // Render data widgets for other IDs
            const [canID, channelKey] = widgetId.split("-");
            const channelData = configData[canID]?.DataChannels?.[channelKey];

            if (channelData) {
              return (
                <SortableWidget key={widgetId} id={widgetId}>
                  <DataWidget
                    canID={canID}
                    valueToDisplay={channelKey} // Channel key (e.g., "Battery")
                    title={channelKey} // Channel key as the title
                    unit={channelData.unit || ""}
                  />
                </SortableWidget>
              );
            }

            return null;
          })}
        </SortableContext>
      </Stack>
    </DndContext>
  );
};

export default DataWidgetList;
