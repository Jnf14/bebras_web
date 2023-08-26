interface AgeCategoryBoxProps {
  name: string;
  isChecked: boolean;
  onToggle: (name: string) => void;
}

export default function AgeCategoryBox({
  name,
  isChecked,
  onToggle,
}: AgeCategoryBoxProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
        checked={isChecked}
        onChange={(e) => {
          onToggle(name);
        }}
      />
      <label>{name + " ans"}</label>
    </div>
  );
}
