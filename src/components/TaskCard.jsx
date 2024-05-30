import React from "react";
import { useColorScheme } from "../context/ColorSchemeServices";

export default function TaskCard({ task }) {
  const { currentScheme } = useColorScheme();

  return (
    <div className="p-2">
      <div
        className="relative border-2 border-solid w-36 h-36 overflow-hidden flex items-center justify-center"
        style={{
          borderColor: "var(--border-color)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-2">
            {task.taskName}
          </div>
          <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden">
            {task.descriptionRequirements}
          </div>
        </div>
      </div>
    </div>
  );
}
