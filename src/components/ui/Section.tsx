interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section__inner">
        {(eyebrow || title) && (
          <header className="section__header">
            {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
            {title && <h2 className="section__title">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
