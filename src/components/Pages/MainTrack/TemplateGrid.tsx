import React from "react";
import { Card } from "antd";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const AudioTrackGrid: React.FC = () => {
  const [, drop] = useDrop({
    accept: ItemTypes.TEMPLATE,
    drop: (item: any) => {
      // Обработка события перетаскивания элемента на сетку
      console.log("Template dropped:", item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Card
      title="Секвенсор"
      style={{ height: "100%" }}
      bodyStyle={{ padding: 0 }}
    >
      <div
        ref={drop}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
          gridGap: "2px",
        }}
      >
        {[...Array(16)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div
              style={{
                gridRow: `${rowIndex + 1}`,
                gridColumn: "1",
                background: "lightblue",
                textAlign: "center",
                padding: "8px",
              }}
            >
              Дорожка {rowIndex + 1}
            </div>
            {[...Array(4)].map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{
                  gridRow: `${rowIndex + 1}`,
                  gridColumn: `${colIndex + 2}`,
                  background: "white",
                  border: "1px solid #ccc",
                  height: "50px",
                }}
              >
                {/* Содержимое ячейки сетки */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default AudioTrackGrid;
