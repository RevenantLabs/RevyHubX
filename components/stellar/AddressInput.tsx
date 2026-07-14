import { Input } from "@/components/ui/Input";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function AddressInput({
  value,
  onChange,
  label = "Stellar public address",
  placeholder = "G..."
}: AddressInputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#29364d]">{label}</span>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        spellCheck={false}
      />
    </label>
  );
}
