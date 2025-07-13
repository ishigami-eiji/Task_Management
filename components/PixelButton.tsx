
import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'pink' | 'cyan' | 'green' | 'red' | 'yellow';
  className?: string;
}

const colorSchemes = {
  pink: {
    bg: 'bg-[#ff79c6]',
    text: 'text-white',
    border: 'border-[#ff79c6]',
    shadow: 'shadow-[4px_4px_0px_#bd93f9] active:shadow-[1px_1px_0px_#bd93f9]',
    disabled: 'disabled:bg-gray-500 disabled:shadow-none',
  },
  cyan: {
    bg: 'bg-[#8be9fd]',
    text: 'text-[#282a36]',
    border: 'border-[#8be9fd]',
    shadow: 'shadow-[4px_4px_0px_#44475a] active:shadow-[1px_1px_0px_#44475a]',
    disabled: 'disabled:bg-gray-500 disabled:shadow-none',
  },
  green: {
    bg: 'bg-[#50fa7b]',
    text: 'text-[#282a36]',
    border: 'border-[#50fa7b]',
    shadow: 'shadow-[4px_4px_0px_#44475a] active:shadow-[1px_1px_0px_#44475a]',
    disabled: 'disabled:bg-gray-500 disabled:shadow-none',
  },
  red: {
    bg: 'bg-[#ff5555]',
    text: 'text-white',
    border: 'border-[#ff5555]',
    shadow: 'shadow-[4px_4px_0px_#44475a] active:shadow-[1px_1px_0px_#44475a]',
    disabled: 'disabled:bg-gray-500 disabled:shadow-none',
  },
  yellow: {
    bg: 'bg-[#f1fa8c]',
    text: 'text-[#282a36]',
    border: 'border-[#f1fa8c]',
    shadow: 'shadow-[4px_4px_0px_#44475a] active:shadow-[1px_1px_0px_#44475a]',
    disabled: 'disabled:bg-gray-500 disabled:shadow-none',
  },
};

export const PixelButton: React.FC<PixelButtonProps> = ({ children, color = 'pink', className = '', ...props }) => {
  const scheme = colorSchemes[color];
  return (
    <button
      className={`px-4 py-2 font-bold border-2 rounded-md transform active:translate-x-[3px] active:translate-y-[3px] transition-all duration-100 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#282a36] ring-white ${scheme.bg} ${scheme.text} ${scheme.border} ${scheme.shadow} ${scheme.disabled} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
