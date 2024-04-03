import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TemplateList from "./TemplateList";
import AudioTrackGrid from "./TemplateGrid";

interface Template {
  id: number;
  name: string;
}

const MainTrack: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: "Шаблон 1" },
    { id: 2, name: "Шаблон 2" },
    { id: 3, name: "Шаблон 3" },
  ]);

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: templates.length + 1,
      name: `Template ${templates.length + 1}`,
    };
    setTemplates([...templates, newTemplate]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <TemplateList
            templates={templates}
            onCreateTemplate={handleCreateTemplate}
          />
        </div>
        <div style={{ flex: 2 }}>
          <AudioTrackGrid />
        </div>
      </div>
    </DndProvider>
  );
};

export default MainTrack;
