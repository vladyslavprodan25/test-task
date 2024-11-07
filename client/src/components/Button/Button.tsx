import React from "react";

interface ButtonProps {
  type: "submit" | "button";
  label: string;
  onClick?: () => void;
  color?: "primary" | "secondary";
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  color = "primary",
  style,
}) => {
  return (
    <button
      className={color}
      type={type}
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
