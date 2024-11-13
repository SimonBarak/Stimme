import React, { ButtonHTMLAttributes } from "react";
import { Button } from "@radix-ui/themes";

type Variant =
  | "default"
  | "outline"
  | "ghost"
  | "danger"
  | "tag"
  | "text"
  | "disabled";
type Size = "small" | "medium" | "large";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = "default",
  size = "medium",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md transition-all cursor-pointer flex gap-1";

  // Tailwind classes based on variant prop
  const variantClasses: Record<Variant, string> = {
    default: "bg-yellow-200 hover:bg-yellow-300 text-black",
    outline:
      "bg-yellow-200 border border-yellow-800 text-yellow-800 hover:bg-yellow-800",
    tag: "bg-yellow-200 border border-yellow-800 text-yellow-800 hover:bg-yellow-300 rounded-xl",
    ghost: "bg-ghost",
    text: "bg-transparent hover:bg-gray-700",
    danger: "bg-red-500 hover:bg-red-600",
    disabled: "bg-ghost",
  };

  // Tailwind classes based on size prop
  const sizeClasses: Record<Size, string> = {
    small: "px-2 py-1 text-sm",
    medium: "px-6 py-3",
    large: "px-6 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <Button className={classes} onClick={onClick}>
      {children}
    </Button>
  );
};
export default CustomButton;
