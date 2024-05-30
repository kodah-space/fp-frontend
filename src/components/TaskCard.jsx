import React from "react";
import { useColorScheme } from "../context/ColorSchemeServices";

export default function TaskCard({ task }) {
  const { currentScheme } = useColorScheme();

  return (
    <div className="p-2">
      <div
        className="relative border-2 border-solid w-36 h-36 overflow-hidden"
        style={{
          borderColor: "var(--border-color)",
        }}
      >
        <div className="absolute inset-x-0 top-0 w-full h-1/2 flex items-center justify-center z-10">
          <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-2">
            {task.taskName}
          </div>
<<<<<<< HEAD
        </div>
        <div
          className="absolute inset-x-0 top-1/2 w-full h-0 border-b-2 z-15"
          style={{ borderColor: "var(--border-color)" }}
        ></div>
        <div className="absolute inset-x-0 bottom-0 w-full h-1/2 flex items-center justify-center z-20">
          <div className="px-1 text-xs text-left font-[Unbounded-Regular] tracking-wide overflow-hidden line-clamp-3">
=======
          {/* <div className="px-1 text-sm text-center font-[Unbounded-Regular] tracking-wide overflow-hidden">
>>>>>>> 21c796955aca87a02735ac82777b200c51f2cd6d
            {task.descriptionRequirements}
          </div> */}
        </div>
      </div>
    </div>
  );
}
