interface CyberPanelProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function CyberPanel({ title, icon, children }: CyberPanelProps) {
  return (
    <div className="cyber-panel">
      <div className="cyber-panel__header">
        <span className="cyber-panel__dot cyber-panel__dot--red" />
        <span className="cyber-panel__dot cyber-panel__dot--yellow" />
        <span className="cyber-panel__dot cyber-panel__dot--purple" />
        {icon}
        <span className="cyber-panel__title">{title}</span>
      </div>
      <div className="cyber-panel__body">{children}</div>
    </div>
  );
}
