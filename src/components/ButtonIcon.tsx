import { TrashIcon } from "@phosphor-icons/react";

interface ButtonIconProps {
  onClick: () => void;
}

const ButtonIcon = ({ onClick }: ButtonIconProps) => {
  return (
    <button onClick={onClick}>
      <TrashIcon size={32} />
    </button>
  );
};

export default ButtonIcon;
