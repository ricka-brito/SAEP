"use client"

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = '', children }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
