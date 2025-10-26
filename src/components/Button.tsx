interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "glass";
}

const Button = ({
  type = "button",
  disabled = false,
  label,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  const baseClasses = "w-full rounded-xl px-6 py-4 text-center text-sm font-semibold transition-all duration-200";
  const variantClasses = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    secondary: "glass-card text-foreground border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed",
    glass: "glass text-foreground hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default Button;
