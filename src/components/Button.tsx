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
    <button type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
