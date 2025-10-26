import { TrashIcon } from "@phosphor-icons/react";

interface ButtonIconProps {
  onClick: () => void;
}

const ButtonIcon = ({ onClick }: ButtonIconProps) => {
  return (
    <button
      className="h-8 w-8 text-error transition-colors hover:text-red-600"
      onClick={onClick}
    >
      <TrashIcon size={32} />
    </button>
  );
};

export default ButtonIcon;
