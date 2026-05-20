import type { TextareaHTMLAttributes } from "react";

interface CyberTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  counterCurrent?: number;
  counterMax?: number;
}

export function CyberTextarea({ label, error, counterCurrent, counterMax, ...props }: CyberTextareaProps) {
  return (
    <div>
      <label className="cyber-input__label">// {label}</label>
      <textarea className="cyber-textarea" {...props} />
      {error && <span className="cyber-input__error">{error}</span>}
      {counterMax !== undefined && counterCurrent !== undefined && (
        <span className="cyber-textarea__counter">
          {counterCurrent}/{counterMax}
        </span>
      )}
    </div>
  );
}
