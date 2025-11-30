import React from 'react';

const Input = React.forwardRef(({ className = '', type, ...props }, ref) => {
  const baseClasses = "flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };