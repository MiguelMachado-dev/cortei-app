import { TrashIcon } from "@phosphor-icons/react";

interface ButtonIconProps {
  onClick: () => void;
}

const ButtonIcon = ({ onClick }: ButtonIconProps) => {
  return (
    <button
      className="h-8 w-8 text-[color:var(--yellow)] transition-colors hover:text-[color:var(--yellow-dark)]"
      onClick={onClick}
    >
      <TrashIcon size={32} />
    </button>
  );
};

export default ButtonIcon;
