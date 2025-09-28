
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center px-4 py-2 border border-transparent 
        text-base font-medium rounded-md shadow-sm text-white bg-amber-600 
        hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-amber-500 transition-colors duration-200
        disabled:bg-stone-400 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
