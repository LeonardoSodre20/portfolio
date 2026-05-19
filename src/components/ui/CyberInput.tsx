interface CyberInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export function CyberInput({ label, value, onChange, placeholder, type = "text" }: CyberInputProps) {
  return (
    <div>
      <label className="cyber-input__label">// {label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="cyber-input__field"
      />
    </div>
  );
}
