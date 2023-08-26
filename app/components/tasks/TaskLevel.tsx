"use client";

interface TaskLevelProps {
  age: string;
  level: string;
}

export default function TaskLevel({ age, level }: TaskLevelProps) {
  let color: string;
  if (level === "easy") {
    color = "bg-green-100";
  } else if (level === "medium") {
    color = "bg-yellow-100";
  } else if (level === "hard") {
    color = "bg-red-100";
  } else {
    color = "bg-gray-100";
  }

  return (
    <span
      className={`
       inline-block
        whitespace-nowrap
        font-light
        text-gray-500
        text-sm
        border-cyan-600
        rounded-lg  
        m-1
        p-1
        text-center 
        align-baseline
        leading-none
        ${color}`}
    >
      <h4>
        {age} : {level}
      </h4>
    </span>
  );
}
