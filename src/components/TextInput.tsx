import { UserSquareIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface TextInputProps {
  type?: string;
  placeholder: string;
  name: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TextInput = ({
  type = "text",
  placeholder,
  name,
  ...rest
}: TextInputProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative flex items-center">
      <UserSquareIcon size={20} className="fill-yellow absolute ml-3" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        {...rest}
        className="h-12 w-full rounded-lg border border-gray-500 p-3 pl-10 text-gray-200 placeholder-gray-400 outline-[color:var(--yellow-dark)] focus:outline"
      />
    </div>
  );
};

export default TextInput;
