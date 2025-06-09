import React from "react";
import PropTypes from "prop-types";

export default function Button({
  children,
  size = "md",
  variant = "default",
  ...props
}) {
  const sizeClasses = {
    sm: "text-sm py-1.5 px-4",
    md: "text-base py-2 px-5",
    lg: "text-lg py-3 px-6",
    icon: "h-12 w-12 flex items-center justify-center p-2",
  };
  const variantClasses = {
    default: "bg-[--s-col] text-white hover:bg-[#dcaf64]",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    outline:
      "border border-[--s-col] text-[--s-col] hover:bg-[#dcaf64] hover:text-white",
    text: "text-blue-500 hover:underline",
  };
  return (
    <button
      className={`font-medium ${sizeClasses[size]} ${variantClasses[variant]} rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
  size: PropTypes.oneOf(["sm", "md", "lg", "icon"]),
  variant: PropTypes.oneOf([
    "default",
    "secondary",
    "danger",
    "success",
    "outline",
    "text",
  ]),
};
