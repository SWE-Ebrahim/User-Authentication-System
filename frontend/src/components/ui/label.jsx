import React from 'react';

const Label = React.forwardRef(({ className = '', ...props }, ref) => {
  const baseClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700";
  
  return (
    <label
      ref={ref}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
});

Label.displayName = "Label";

export { Label };