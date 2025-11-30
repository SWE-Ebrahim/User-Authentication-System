import React from 'react';

const Button = React.forwardRef(({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default', 
  asChild = false,
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5",
    destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5",
    outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:shadow-md transform hover:-translate-y-0.5",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-sm hover:shadow-md hover:from-gray-200 hover:to-gray-300 transform hover:-translate-y-0.5",
    ghost: "hover:bg-gray-100 hover:text-gray-900 transform hover:-translate-y-0.5",
    link: "text-blue-600 underline-offset-4 hover:underline"
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (asChild && React.isValidElement(children)) {
    // Clone the child element and pass props to it, but don't pass the ref to avoid accessing it during render
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: `${classes} ${children.props.className || ''}`
    });
  }
  
  return (
    <button
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };