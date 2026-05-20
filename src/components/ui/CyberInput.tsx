import type { InputHTMLAttributes } from "react";

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function CyberInput({ label, error, className, ...props }: CyberInputProps) {
  return (
    <div>
      <label className="cyber-input__label">// {label}</label>
      <input className={`cyber-input__field ${className ?? ""}`} {...props} />
      {error && <span className="cyber-input__error">{error}</span>}
    </div>
  );
}
