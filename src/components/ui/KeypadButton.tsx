interface KeypadButtonProps {
  value: string;
  onClick: (val: string) => void;
  className?: string;
}

const KeypadButton = ({ value, onClick, className = "" }: KeypadButtonProps) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex justify-center p-1 sm:p-2 items-center flex-1 rounded-lg bg-gradient-to-b from-[rgba(255,255,255,0.16)] to-[rgba(255,255,255,0)] hover:from-[rgba(255,255,255,0.2)] hover:to-[rgba(255,255,255,0.05)] transition-colors duration-200 ${className}`}
    >
      {value === "delete" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 4H8L1 12L8 20H21C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18V6C23 5.46957 22.7893 4.96086 22.4142 4.58579C22.0391 4.21071 21.5304 4 21 4Z"
            fill="#FFFFFF"
          />
          <path d="M18 9L12 15" stroke="#110703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 9L18 15" stroke="#110703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span className="text-xl sm:text-2xl font-medium leading-[1.5em] text-center text-white">{value}</span>
      )}
    </button>
  );
};

export default KeypadButton;
