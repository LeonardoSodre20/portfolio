interface CyberBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function CyberBtn({ children, onClick, primary, fullWidth, type = "button", disabled }: CyberBtnProps) {
  const classes = [
    "cyber-btn",
    primary ? "cyber-btn--primary" : "cyber-btn--secondary",
    fullWidth ? "cyber-btn--full" : "",
  ].filter(Boolean).join(" ");

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
