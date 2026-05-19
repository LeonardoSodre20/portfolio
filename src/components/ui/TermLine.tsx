interface TermLineProps {
  cmd: string;
  out: string;
  color: string;
}

export function TermLine({ cmd, out, color }: TermLineProps) {
  return (
    <div className="term-line">
      <div className="term-line__cmd">
        <span className="term-line__prompt">$</span>
        <span className="term-line__text">{cmd}</span>
      </div>
      <p className="term-line__output" style={{ color }}>{out}</p>
    </div>
  );
}
