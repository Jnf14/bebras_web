"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  large?: boolean;
  bgColor?: string;
  textColor?: string;
  icon?: IconType;
  iconSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline: outline,
  large,
  bgColor,
  textColor,
  icon: Icon,
  iconSize = "12",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative rounded-lg hover:bg-neutral-100 transition ease-out duration-500 w-full flex flex-row items-center gap-2 text-sm font-light border-[1px]
        ${outline ? "border-black" : "border-white"}
        ${large ? "text-lg p-1 py-2" : "text-sm p-1"}
        ${bgColor ? bgColor : "bg-white"}
        ${textColor ? textColor : "text-gray-500"}
      `}
    >
      {label}
      {Icon && <Icon size={iconSize} />}
    </button>
  );
};

export default Button;
