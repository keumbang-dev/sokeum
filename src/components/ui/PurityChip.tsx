interface PurityChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const PurityChip = ({ label, active, onClick }: PurityChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center w-[70px] sm:w-[80px] py-2 rounded-full text-base sm:text-lg leading-[1.5em] text-center transition-colors duration-200
        ${
          active
            ? "bg-[#D95204] text-white font-semibold"
            : "border-2 border-[#737373] text-[#A4A4A4] font-medium hover:bg-[#333]"
        }`}
    >
      {label}
    </button>
  );
};

export default PurityChip;
