import { UserSquareIcon } from "@phosphor-icons/react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  name: string;
  inputValue: string;
  setInputValue: (event: string) => void;
};

const TextInput = ({
  placeholder,
  name,
  inputValue,
  setInputValue,
  ...rest
}: TextInputProps) => {
  return (
    <div className="relative flex items-center">
      <UserSquareIcon size={20} className="fill-yellow absolute ml-3" />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        name={name}
        {...rest}
        className="h-12 w-full rounded-lg border border-gray-500 p-3 pl-10 text-gray-200 placeholder-gray-400 outline-[color:var(--yellow-dark)] focus:outline"
      />
    </div>
  );
};

export default TextInput;
