interface CategoryBoxProps {
    name: string;
    isChecked: boolean;
    onToggle: (name: string) => void;
  }
  
  export default function CategoryBox({
    name,
    isChecked,
    onToggle,
  }: CategoryBoxProps) {
    return (
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
            checked={isChecked}
            onChange={(e) => {
              onToggle(name);
            }}
          />
          {name}
        </label>
      </div>
    )
  }
  