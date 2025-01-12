import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { className = "", ...rest } = props;

    return (
      <input
        className={
          "px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 w-full " +
          `${className}`
        }
        ref={ref}
        {...rest}
      >
        {props.children}
      </input>
    );
  }
);

export default Input;
