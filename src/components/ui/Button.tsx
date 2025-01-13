import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "success"
    | "warning"
    | "neutral";
  size?: "default" | "sm" | "xsm" | "icon" | "lg";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const {
      variant = "primary",
      size = "default",
      className = "",
      loading = false,
      ...rest
    } = props;

    const variantClasses = {
      primary:
        "border-localiza-green bg-localiza-green text-white hover:bg-localiza-green-dark ",
      secondary: "border-gray-300 text-gray-700 dark:text-gray-300 ",
      destructive:
        "border-red-500 bg-red-500 text-white rounded-lg hover:bg-red-600 ",
      success:
        "border-green-500 text-green-500 hover:bg-green-100 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900 ",
      warning:
        "border-red-500 text-red-500 hover:bg-red-100 transition dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900 ",
      neutral:
        "border-gray-500 text-gray-500 hover:bg-gray-100 transition dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-900 ",
    };

    const disabledClasses = {
      primary: " ",
      secondary:
        "disabled:text-gray-400 dark:disabled:text-gray-400 disabled:border-gray-300 dark:disabled:border-gray-400 ",
      destructive: " ",
      success: " ",
      warning: " ",
      neutral: " ",
    };

    const sizeClasses = {
      default: "px-4 py-2 ",
      sm: "px-3 py-1 ",
      xsm: "px-2 py-1 text-xs ",
      icon: " ",
      lg: "px-6 py-3 ",
    };

    const spinner = (
      <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
    );

    return (
      <button
        className={
          "rounded-lg transition border disabled:cursor-not-allowed " +
          variantClasses[variant] +
          disabledClasses[variant] +
          sizeClasses[size] +
          `${props.className}`
        }
        ref={ref}
        {...rest}
      >
        {loading && spinner}
        {!loading && props.children}
      </button>
    );
  }
);

export default Button;
