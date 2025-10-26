import { User } from "lucide-react";

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
    <div className="relative group">
      <User 
        size={18} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        name={name}
        {...rest}
        className="h-12 w-full rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 pl-12 pr-4 text-foreground placeholder-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 hover:bg-white/7 focus:bg-white/10"
      />
    </div>
  );
};

export default TextInput;
