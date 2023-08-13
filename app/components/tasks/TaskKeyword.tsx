"use client";

interface TaskKeywordProp {
  keyword: string;
  color?: string;
}

const TaskCard: React.FC<TaskKeywordProp> = ({ keyword, color }) => {
  return (
    <span
      className="
        inline-block 
        whitespace-nowrap
        bg-blue-100
        font-light
        text-cyan-600
        text-sm
        border-cyan-600
        rounded-lg  
        mx-1
        p-1
        text-center 
        align-baseline
        leading-none"
    >
      {keyword}
    </span>
  );
};

export default TaskCard;
