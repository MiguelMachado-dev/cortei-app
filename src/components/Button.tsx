interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  label: string;
  onClick: () => void;
}

const Button = ({
  type = "button",
  disabled = false,
  label,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="text-grey-900 hover:not-disabled:outline-[color:var(--yellow-light)] w-full max-w-[340px] cursor-pointer rounded-lg bg-[color:var(--yellow)] p-[18px] text-sm font-bold uppercase outline-2 outline-transparent transition-all disabled:cursor-not-allowed disabled:opacity-30 disabled:brightness-50"
    >
      {label}
    </button>
  );
};

export default Button;
