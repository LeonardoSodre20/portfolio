import { Shield } from "lucide-react";

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="section-label">
      <Shield size={14} className="section-label__icon" />
      <h2 className="section-label__text">{children}</h2>
      <div className="section-label__line" />
    </div>
  );
}
