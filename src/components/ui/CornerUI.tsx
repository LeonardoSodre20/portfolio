interface CornerUIProps {
  pos: string;
  mirror?: boolean;
  flip?: boolean;
}

export function CornerUI({ pos, mirror, flip }: CornerUIProps) {
  return (
    <div
      className={`corner-ui ${pos}`}
      style={{
        transform: `${mirror ? "scaleX(-1)" : ""} ${flip ? "scaleY(-1)" : ""}`,
      }}
    >
      <svg width="44" height="44" fill="none">
        <path d="M2 42 L2 2 L42 2" stroke="var(--color-purple)" strokeWidth="1.5" />
        <path d="M2 36 L2 8" stroke="var(--color-magenta)" strokeWidth="0.5" opacity="0.5" />
        <circle cx="2" cy="2" r="2.5" fill="var(--color-purple)" />
        <circle cx="42" cy="2" r="1.5" fill="var(--color-magenta)" opacity="0.6" />
      </svg>
    </div>
  );
}
